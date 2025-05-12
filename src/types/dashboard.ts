
export type DateRange = '30' | '60' | '90';

export type RiskTier = 1 | 2 | 3 | 4;

export interface Patient {
  id: string;
  name: string;
  age: number;
  hccScore: number;
  dementia: boolean;
  dualEligible: boolean;
  riskTier: RiskTier;
  lastEDVisit: string; // ISO date string
  flaggedGaps: string[];
  facility: string;
  state: string;
  provider: string;
}

export interface Facility {
  id: string;
  name: string;
  state: string;
}

export interface Provider {
  id: string;
  name: string;
}

export interface FilterState {
  dateRange: DateRange;
  facility: string | null;
  state: string | null;
  provider: string | null;
  riskTier: RiskTier | null;
  cognitiveImpairment: boolean | null;
  dualStatus: boolean | null;
}

export interface KeyMetrics {
  totalPatients: number;
  percentDualEligible: number;
  percentCognitiveImpairment: number;
  avgHccScore: number;
  highRiskPatients: number;
}

export interface RiskTierBreakdown {
  tier1Percent: number;
  tier2Percent: number;
  tier3Percent: number;
  tier4Percent: number;
}
