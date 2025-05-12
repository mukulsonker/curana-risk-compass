
import { DateRange, Facility, FilterState, Patient, Provider, KeyMetrics, RiskTierBreakdown } from '../types/dashboard';

// Mock facilities
export const facilities: Facility[] = [
  { id: 'fac1', name: 'Sunshine Senior Living', state: 'CA' },
  { id: 'fac2', name: 'Golden Years Care Center', state: 'FL' },
  { id: 'fac3', name: 'Mountain View Retirement', state: 'CO' },
  { id: 'fac4', name: 'Seaside Elder Care', state: 'MA' },
  { id: 'fac5', name: 'Parkview Assisted Living', state: 'NY' },
];

// Mock states
export const states = ['CA', 'FL', 'CO', 'MA', 'NY', 'TX', 'WA'];

// Mock providers
export const providers: Provider[] = [
  { id: 'prov1', name: 'Dr. Sarah Johnson' },
  { id: 'prov2', name: 'Dr. Michael Chen' },
  { id: 'prov3', name: 'Dr. Emily Rodriguez' },
  { id: 'prov4', name: 'Dr. David Kim' },
  { id: 'prov5', name: 'Dr. Lisa Thompson' },
];

// Generate 100 mock patients
const generateMockPatients = (): Patient[] => {
  const patients: Patient[] = [];
  const names = [
    'John Smith', 'Mary Johnson', 'Robert Williams', 'Patricia Brown', 'James Jones',
    'Jennifer Miller', 'Michael Davis', 'Linda Garcia', 'William Rodriguez', 'Elizabeth Martinez',
    'David Anderson', 'Barbara Thomas', 'Richard Jackson', 'Susan White', 'Joseph Harris',
    'Margaret Martin', 'Charles Thompson', 'Jessica Garcia', 'Thomas Martinez', 'Sarah Robinson'
  ];
  
  const gaps = [
    'Annual Wellness Visit', 'Medication Review', 'Depression Screening', 'Diabetes Eye Exam',
    'Blood Pressure Check', 'Colorectal Screening', 'Fall Risk Assessment', 'Advance Care Planning',
    'Pneumonia Vaccine', 'Flu Vaccine'
  ];

  for (let i = 1; i <= 100; i++) {
    const riskTier = Math.floor(Math.random() * 4) + 1 as 1 | 2 | 3 | 4;
    const randomFacility = facilities[Math.floor(Math.random() * facilities.length)];
    const randomProvider = providers[Math.floor(Math.random() * providers.length)];
    
    // Generate more high-risk patients for realism
    const weightedRiskTier = Math.random() < 0.4 ? (Math.random() < 0.6 ? 1 : 2) : riskTier;
    
    // Generate a date within the last 6 months for the ED visit
    const lastEDVisit = new Date();
    lastEDVisit.setDate(lastEDVisit.getDate() - Math.floor(Math.random() * 180));
    
    // Generate random gaps (1-3 per patient)
    const patientGaps: string[] = [];
    const gapCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < gapCount; j++) {
      const randomGap = gaps[Math.floor(Math.random() * gaps.length)];
      if (!patientGaps.includes(randomGap)) {
        patientGaps.push(randomGap);
      }
    }
    
    patients.push({
      id: `P${i.toString().padStart(5, '0')}`,
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 30) + 65, // Age between 65-95
      hccScore: parseFloat((Math.random() * 3 + 0.8).toFixed(2)),
      dementia: Math.random() < 0.35, // 35% chance of dementia
      dualEligible: Math.random() < 0.4, // 40% chance of dual eligibility
      riskTier: weightedRiskTier as 1 | 2 | 3 | 4,
      lastEDVisit: lastEDVisit.toISOString(),
      flaggedGaps: patientGaps,
      facility: randomFacility.name,
      state: randomFacility.state,
      provider: randomProvider.name,
    });
  }
  
  return patients;
};

export const mockPatients = generateMockPatients();

// Mock data service
export const fetchFilteredPatients = (filters: FilterState): Patient[] => {
  let filteredPatients = [...mockPatients];
  
  if (filters.facility) {
    filteredPatients = filteredPatients.filter(p => p.facility === filters.facility);
  }
  
  if (filters.state) {
    filteredPatients = filteredPatients.filter(p => p.state === filters.state);
  }
  
  if (filters.provider) {
    filteredPatients = filteredPatients.filter(p => p.provider === filters.provider);
  }
  
  if (filters.riskTier) {
    filteredPatients = filteredPatients.filter(p => p.riskTier === filters.riskTier);
  }
  
  if (filters.cognitiveImpairment !== null) {
    filteredPatients = filteredPatients.filter(p => p.dementia === filters.cognitiveImpairment);
  }
  
  if (filters.dualStatus !== null) {
    filteredPatients = filteredPatients.filter(p => p.dualEligible === filters.dualStatus);
  }
  
  // Filter by date range
  // In a real app, we'd use the date range to filter, but for mock data we'll just limit results
  const dateRangeNum = parseInt(filters.dateRange);
  const limitFactor = dateRangeNum / 90;
  const limit = Math.floor(filteredPatients.length * limitFactor);
  
  return filteredPatients.slice(0, limit);
};

// Generate key metrics based on filtered patients
export const getKeyMetrics = (patients: Patient[]): KeyMetrics => {
  const totalPatients = patients.length;
  const dualEligible = patients.filter(p => p.dualEligible).length;
  const cognitiveImpairment = patients.filter(p => p.dementia).length;
  const highRisk = patients.filter(p => p.riskTier === 1 || p.riskTier === 2).length;
  const totalHccScore = patients.reduce((sum, p) => sum + p.hccScore, 0);
  
  return {
    totalPatients,
    percentDualEligible: totalPatients ? (dualEligible / totalPatients) * 100 : 0,
    percentCognitiveImpairment: totalPatients ? (cognitiveImpairment / totalPatients) * 100 : 0,
    avgHccScore: totalPatients ? totalHccScore / totalPatients : 0,
    highRiskPatients: highRisk,
  };
};

// Generate risk tier breakdown based on filtered patients
export const getRiskTierBreakdown = (patients: Patient[]): RiskTierBreakdown => {
  const totalPatients = patients.length;
  const tier1 = patients.filter(p => p.riskTier === 1).length;
  const tier2 = patients.filter(p => p.riskTier === 2).length;
  const tier3 = patients.filter(p => p.riskTier === 3).length;
  const tier4 = patients.filter(p => p.riskTier === 4).length;
  
  return {
    tier1Percent: totalPatients ? (tier1 / totalPatients) * 100 : 0,
    tier2Percent: totalPatients ? (tier2 / totalPatients) * 100 : 0,
    tier3Percent: totalPatients ? (tier3 / totalPatients) * 100 : 0,
    tier4Percent: totalPatients ? (tier4 / totalPatients) * 100 : 0,
  };
};
