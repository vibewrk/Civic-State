/**
 * Curated state statute cache -- in-memory store of verified statute
 * references organized by state and issue category.
 *
 * All entries are pre-verified against official legislative sources.
 * This avoids API calls for commonly-cited state laws.
 */

export interface StateCacheEntry {
  state: string;
  category: string;
  statuteId: string;
  title: string;
  text: string;
  url: string;
  verified: true;
  source: 'state_cache';
}

type StateCode = string;
type Category = string;

const STATUTE_CACHE: Record<StateCode, Record<Category, StateCacheEntry[]>> = {
  CA: {
    housing: [
      {
        state: 'CA',
        category: 'housing',
        statuteId: 'CA-CIV-1940',
        title: 'California Civil Code Section 1940-1954.06 - Hiring of Real Property',
        text: 'Establishes tenant rights including habitability requirements, security deposit limits (max 1 month rent), anti-retaliation protections, and landlord entry notice requirements (24 hours).',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=5.&part=4.&chapter=2.&article=',
        verified: true,
        source: 'state_cache',
      },
      {
        state: 'CA',
        category: 'housing',
        statuteId: 'CA-GOV-12955',
        title: 'California Fair Employment and Housing Act - Section 12955',
        text: 'Prohibits housing discrimination based on race, color, religion, sex, gender, sexual orientation, marital status, national origin, ancestry, familial status, source of income, disability, veteran status, or genetic information.',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=12955.&lawCode=GOV',
        verified: true,
        source: 'state_cache',
      },
      {
        state: 'CA',
        category: 'housing',
        statuteId: 'CA-CIV-1946.2',
        title: 'California Tenant Protection Act (AB 1482)',
        text: 'Caps annual rent increases at 5% plus local CPI (max 10%) for covered properties. Requires just cause for eviction after 12 months of tenancy. Applies to housing built 15+ years ago.',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1946.2.&lawCode=CIV',
        verified: true,
        source: 'state_cache',
      },
    ],
    environment: [
      {
        state: 'CA',
        category: 'environment',
        statuteId: 'CA-HSC-39000',
        title: 'California Health and Safety Code - Division 26 Air Resources',
        text: 'Establishes the California Air Resources Board (CARB) and authorizes air quality standards, vehicle emission controls, and the cap-and-trade program under AB 32.',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=HSC&division=26.&title=&part=1.&chapter=1.&article=',
        verified: true,
        source: 'state_cache',
      },
      {
        state: 'CA',
        category: 'environment',
        statuteId: 'CA-PRC-21000',
        title: 'California Environmental Quality Act (CEQA)',
        text: 'Requires state and local agencies to evaluate the environmental impact of projects and adopt feasible alternatives or mitigation measures. Mandates Environmental Impact Reports (EIRs) for projects with significant environmental effects.',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=PRC&division=13.&title=&part=&chapter=&article=',
        verified: true,
        source: 'state_cache',
      },
    ],
    public_safety: [
      {
        state: 'CA',
        category: 'public_safety',
        statuteId: 'CA-PEN-11164',
        title: 'California Penal Code Section 11164-11174.3 - Child Abuse Reporting',
        text: 'Mandates reporting of suspected child abuse or neglect by designated professionals. Failure to report is a misdemeanor. Establishes immunity for good-faith reporters.',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=PEN&division=&title=1.&part=4.&chapter=2.&article=2.5.',
        verified: true,
        source: 'state_cache',
      },
    ],
  },
  NY: {
    housing: [
      {
        state: 'NY',
        category: 'housing',
        statuteId: 'NY-RPL-227',
        title: 'New York Real Property Law Section 227-a - Retaliatory Eviction',
        text: 'Prohibits landlords from retaliating against tenants who complain about housing code violations. Protects tenants who report issues to government agencies.',
        url: 'https://www.nysenate.gov/legislation/laws/RPP/227-A',
        verified: true,
        source: 'state_cache',
      },
      {
        state: 'NY',
        category: 'housing',
        statuteId: 'NY-RPL-235-B',
        title: 'New York Real Property Law Section 235-b - Warranty of Habitability',
        text: 'Implies in every residential lease a warranty that the premises are fit for human habitation. Cannot be waived. Tenant may deduct repair costs from rent for landlord failures.',
        url: 'https://www.nysenate.gov/legislation/laws/RPP/235-B',
        verified: true,
        source: 'state_cache',
      },
      {
        state: 'NY',
        category: 'housing',
        statuteId: 'NY-HSTPA-2019',
        title: 'Housing Stability and Tenant Protection Act of 2019',
        text: 'Comprehensive tenant protection: eliminates vacancy decontrol, limits security deposits to 1 month, requires 30-90 day notice before rent increases over 5%, and strengthens rent stabilization statewide.',
        url: 'https://www.nysenate.gov/legislation/bills/2019/s6458',
        verified: true,
        source: 'state_cache',
      },
    ],
    environment: [
      {
        state: 'NY',
        category: 'environment',
        statuteId: 'NY-ECL-3-0301',
        title: 'New York Environmental Conservation Law - DEC Powers',
        text: 'Establishes the Department of Environmental Conservation with authority to regulate air quality, water resources, solid waste, and hazardous substances.',
        url: 'https://www.nysenate.gov/legislation/laws/ENV/3-0301',
        verified: true,
        source: 'state_cache',
      },
      {
        state: 'NY',
        category: 'environment',
        statuteId: 'NY-CLCPA-2019',
        title: 'Climate Leadership and Community Protection Act',
        text: 'Requires New York to reduce greenhouse gas emissions 40% by 2030 and 85% by 2050 from 1990 levels. Mandates 70% renewable electricity by 2030 and 100% zero-emission by 2040.',
        url: 'https://www.nysenate.gov/legislation/bills/2019/s6599',
        verified: true,
        source: 'state_cache',
      },
    ],
    public_safety: [
      {
        state: 'NY',
        category: 'public_safety',
        statuteId: 'NY-SSL-413',
        title: 'New York Social Services Law Section 413 - Mandated Reporters',
        text: 'Designates mandated reporters of child abuse and maltreatment including teachers, medical professionals, social workers, and law enforcement. Requires immediate oral report followed by written report within 48 hours.',
        url: 'https://www.nysenate.gov/legislation/laws/SOS/413',
        verified: true,
        source: 'state_cache',
      },
    ],
  },
  TX: {
    housing: [
      {
        state: 'TX',
        category: 'housing',
        statuteId: 'TX-PROP-92',
        title: 'Texas Property Code Chapter 92 - Residential Tenancies',
        text: 'Governs residential landlord-tenant relationships including security deposit return (30 days), landlord duty to repair (conditions affecting health/safety), and tenant remedies for landlord noncompliance.',
        url: 'https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm',
        verified: true,
        source: 'state_cache',
      },
      {
        state: 'TX',
        category: 'housing',
        statuteId: 'TX-PROP-92.056',
        title: 'Texas Property Code Section 92.056 - Landlord Obligation to Repair',
        text: 'Requires landlords to make diligent efforts to repair conditions that materially affect the physical health or safety of an ordinary tenant after notice. Tenants may exercise repair-and-deduct remedy.',
        url: 'https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm#92.056',
        verified: true,
        source: 'state_cache',
      },
    ],
    environment: [
      {
        state: 'TX',
        category: 'environment',
        statuteId: 'TX-HSC-382',
        title: 'Texas Health and Safety Code Chapter 382 - Clean Air Act',
        text: 'Establishes the Texas Commission on Environmental Quality (TCEQ) authority over air quality. Regulates emissions permits, monitoring, and enforcement for industrial facilities.',
        url: 'https://statutes.capitol.texas.gov/Docs/HS/htm/HS.382.htm',
        verified: true,
        source: 'state_cache',
      },
      {
        state: 'TX',
        category: 'environment',
        statuteId: 'TX-WC-26',
        title: 'Texas Water Code Chapter 26 - Water Quality Control',
        text: 'Regulates discharge of waste into state waters. Requires permits for wastewater discharge and establishes water quality standards enforced by TCEQ.',
        url: 'https://statutes.capitol.texas.gov/Docs/WA/htm/WA.26.htm',
        verified: true,
        source: 'state_cache',
      },
    ],
    public_safety: [
      {
        state: 'TX',
        category: 'public_safety',
        statuteId: 'TX-FAM-261',
        title: 'Texas Family Code Chapter 261 - Investigation of Child Abuse',
        text: 'Mandates reporting of suspected child abuse or neglect. Any person who suspects abuse must report to DFPS or law enforcement. Knowing failure to report is a Class A misdemeanor.',
        url: 'https://statutes.capitol.texas.gov/Docs/FA/htm/FA.261.htm',
        verified: true,
        source: 'state_cache',
      },
    ],
  },
};

/**
 * Search the curated state statute cache.
 * Returns matching statutes for the given state and categories.
 */
export function searchStateCache(
  state: string,
  categories: string[] = [],
): StateCacheEntry[] {
  const stateUpper = state.toUpperCase();
  const stateData = STATUTE_CACHE[stateUpper];
  if (!stateData) return [];

  // If no categories specified, return all statutes for the state
  if (categories.length === 0) {
    return Object.values(stateData).flat();
  }

  const results: StateCacheEntry[] = [];
  for (const category of categories) {
    const catLower = category.toLowerCase().replace(/\s+/g, '_');
    const entries = stateData[catLower];
    if (entries) {
      results.push(...entries);
    }
  }

  return results;
}

/**
 * Get all supported states in the cache.
 */
export function getCachedStates(): string[] {
  return Object.keys(STATUTE_CACHE);
}

/**
 * Get all categories available for a given state.
 */
export function getCachedCategories(state: string): string[] {
  const stateData = STATUTE_CACHE[state.toUpperCase()];
  if (!stateData) return [];
  return Object.keys(stateData);
}
