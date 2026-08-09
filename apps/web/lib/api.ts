import type {
  JurisdictionLevel,
  OfficialCoverageResponse,
} from "./official-coverage";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { message?: string }).message ||
        `Request failed with status ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}

// --- Types ---

export interface SubmissionInput {
  issueDescription: string;
  desiredOutcome: string;
  zipCode: string;
  fullName?: string;
  anonymous: boolean;
}

export interface Submission {
  id: string;
  status: string;
}

export interface ResearchStatus {
  status: "classifying" | "researching" | "drafting" | "ready" | "error";
  progress: number;
  message?: string;
}

interface ResearchStatusResponse {
  status: string;
  clientStatus?: ResearchStatus["status"];
  progress?: number;
  message?: string;
  research?: {
    label?: string;
    progress?: number;
  };
}

const RESEARCH_STATUS_BY_JOB_STATUS: Record<string, ResearchStatus["status"]> = {
  submitted: "classifying",
  classifying: "classifying",
  researching: "researching",
  drafting: "drafting",
  payment_pending: "ready",
  paid: "ready",
  delivering: "ready",
  delivered: "ready",
  failed: "error",
};

function isResearchStatus(status: string): status is ResearchStatus["status"] {
  return ["classifying", "researching", "drafting", "ready", "error"].includes(
    status
  );
}

function normalizeResearchStatus(
  response: ResearchStatusResponse
): ResearchStatus {
  const status =
    response.clientStatus ??
    RESEARCH_STATUS_BY_JOB_STATUS[response.status] ??
    (isResearchStatus(response.status) ? response.status : "classifying");

  return {
    status,
    progress: response.progress ?? response.research?.progress ?? 0,
    message: response.message ?? response.research?.label,
  };
}

export interface Official {
  id?: string;
  name: string;
  title: string;
  email?: string;
  jurisdiction: string;
  level?: JurisdictionLevel;
  district?: string;
  state?: string;
  party?: string;
  phone?: string | null;
  sourceApi?: string;
  sourceUrl?: string;
  sourceLastVerifiedAt?: string;
}

export interface OfficialLookupResponse {
  zipCode: string;
  officials: Official[];
  coverage: Record<JurisdictionLevel, number>;
  confidence: OfficialCoverageResponse["confidence"];
  count: number;
}

export interface LetterPreview {
  official: Official;
  content: string;
  citations: string[];
}

export interface LetterPreviewResponse {
  letters: LetterPreview[];
  pricingTiers: Record<PreviewPricingTier, number>;
}

// --- API functions ---

export async function createSubmission(
  data: SubmissionInput
): Promise<Submission> {
  return request<Submission>("/api/submissions", {
    method: "POST",
    body: JSON.stringify({
      issueDescription: data.issueDescription,
      desiredOutcome: data.desiredOutcome,
      zipCode: data.zipCode,
      isAnonymous: data.anonymous,
    }),
  });
}

export async function getResearchStatus(id: string): Promise<ResearchStatus> {
  const response = await request<ResearchStatusResponse>(
    `/api/submissions/${id}/research`
  );
  return normalizeResearchStatus(response);
}

export async function getLetterPreviews(
  id: string
): Promise<LetterPreviewResponse> {
  return request<LetterPreviewResponse>(`/api/submissions/${id}/preview`);
}

export async function lookupOfficials(
  zipCode: string
): Promise<OfficialLookupResponse> {
  return request<OfficialLookupResponse>(`/api/officials?zipCode=${zipCode}`);
}

export async function lookupOfficialCoverage(
  zipCode: string,
  options?: RequestInit
): Promise<OfficialCoverageResponse> {
  return request<OfficialCoverageResponse>(
    `/api/officials/coverage?zipCode=${zipCode}`,
    options
  );
}

// --- Payment ---

export interface PaymentSession {
  checkoutUrl: string;
  sessionId: string;
}

export type PreviewPricingTier = "single" | "three" | "all";
type PaymentPricingTier = "single" | "three_pack" | "full_spread";

const PREVIEW_TO_PAYMENT_TIER: Record<PreviewPricingTier, PaymentPricingTier> = {
  single: "single",
  three: "three_pack",
  all: "full_spread",
};

export async function createPaymentSession(
  submissionId: string,
  pricingTier: PreviewPricingTier
): Promise<PaymentSession> {
  return request<PaymentSession>(`/api/submissions/${submissionId}/pay`, {
    method: "POST",
    body: JSON.stringify({ tier: PREVIEW_TO_PAYMENT_TIER[pricingTier] }),
    credentials: "include",
  });
}

// --- Dashboard / Campaign Types ---

export interface CampaignDelivery {
  id: string;
  status: string;
  sentAt: string | null;
  deliveredAt: string | null;
  bouncedAt: string | null;
  bounceType: string | null;
}

export interface CampaignOfficial {
  id: string;
  name: string;
  title: string;
  email: string;
  jurisdiction: string;
  level: string;
  district: string | null;
  state: string | null;
  party: string | null;
  phone?: string | null;
}

export interface CampaignLetter {
  id: string;
  status: string;
  official: CampaignOfficial;
  delivery: CampaignDelivery | null;
}

export interface CampaignSubmission {
  id: string;
  issueDescription: string;
  desiredOutcome: string;
  zipCode: string;
  isAnonymous: boolean;
  status: string;
  createdAt: string;
}

export interface CampaignPayment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  status: string;
  pricingTier: string;
  officialCount: number;
  createdAt: string;
  updatedAt: string;
  submission: CampaignSubmission;
  letters: CampaignLetter[];
  payments?: CampaignPayment[];
}

// --- Dashboard API functions ---

export async function getCampaigns(): Promise<Campaign[]> {
  const data = await request<{ campaigns: Campaign[] }>("/api/campaigns", {
    credentials: "include",
  });
  return data.campaigns;
}

export async function getCampaign(id: string): Promise<Campaign> {
  const data = await request<{ campaign: Campaign }>(
    `/api/campaigns/${id}`,
    { credentials: "include" }
  );
  return data.campaign;
}

export async function toggleAnonymity(
  campaignId: string
): Promise<{ isAnonymous: boolean }> {
  return request<{ isAnonymous: boolean }>(
    `/api/campaigns/${campaignId}/anonymity`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );
}
