export type JurisdictionLevel = "federal" | "state" | "local";

export type OfficialCoverageTone = "high" | "medium" | "low" | "none";

export interface OfficialCoverageResponse {
  zipCode: string;
  count: number;
  coverage: Record<JurisdictionLevel, number>;
  confidence: OfficialCoverageTone;
  sources: string[];
}

export interface OfficialCoverageSummary {
  tone: OfficialCoverageTone;
  title: string;
  detail: string;
}

const LEVEL_LABELS: Record<JurisdictionLevel, string> = {
  federal: "Federal",
  state: "State",
  local: "Local",
};

const LEVEL_LIST_FORMATTER = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

function joinLevels(levels: JurisdictionLevel[]): string {
  const labels = levels.map((level, index) =>
    index === 0 ? LEVEL_LABELS[level] : LEVEL_LABELS[level].toLowerCase()
  );

  return LEVEL_LIST_FORMATTER.format(labels);
}

export function summarizeOfficialCoverage(
  coverage: OfficialCoverageResponse
): OfficialCoverageSummary {
  if (coverage.count === 0 || coverage.confidence === "none") {
    return {
      tone: "none",
      title: "No officials found yet",
      detail:
        "You can still submit, but CivicState may need operator review for this ZIP code.",
    };
  }

  const levels = (["federal", "state", "local"] as JurisdictionLevel[]).filter(
    (level) => coverage.coverage[level] > 0
  );
  const missing = (["federal", "state", "local"] as JurisdictionLevel[]).filter(
    (level) => coverage.coverage[level] === 0
  );

  const found = `${joinLevels(levels)} coverage found.`;
  const pending =
    missing.length > 0 ? ` ${joinLevels(missing)} coverage is still pending.` : "";

  return {
    tone: coverage.confidence,
    title: `${coverage.count} ${coverage.count === 1 ? "official" : "officials"} found`,
    detail: `${found}${pending}`,
  };
}
