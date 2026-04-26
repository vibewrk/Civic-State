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

export interface Official {
  name: string;
  title: string;
  jurisdiction: string;
}

export interface LetterPreview {
  official: Official;
  content: string;
  citations: string[];
}

export interface LetterPreviewResponse {
  letters: LetterPreview[];
  pricingTiers: {
    single: number;
    three: number;
    all: number;
  };
}

// --- API functions ---

export async function createSubmission(
  data: SubmissionInput
): Promise<Submission> {
  return request<Submission>("/api/submissions", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getResearchStatus(id: string): Promise<ResearchStatus> {
  return request<ResearchStatus>(`/api/submissions/${id}/research`);
}

export async function getLetterPreviews(
  id: string
): Promise<LetterPreviewResponse> {
  return request<LetterPreviewResponse>(`/api/submissions/${id}/preview`);
}

export async function lookupOfficials(
  zipCode: string
): Promise<Official[]> {
  return request<Official[]>(`/api/officials?zipCode=${zipCode}`);
}

// --- Payment ---

export interface PaymentSession {
  checkoutUrl: string;
  sessionId: string;
}

export async function createPaymentSession(
  submissionId: string,
  pricingTier: PricingTier
): Promise<PaymentSession> {
  return request<PaymentSession>(`/api/submissions/${submissionId}/pay`, {
    method: "POST",
    body: JSON.stringify({ pricingTier }),
    credentials: "include",
  });
}

type PricingTier = "single" | "three" | "all";
