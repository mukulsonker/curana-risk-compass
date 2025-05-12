
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import KeyMetricsCard from '@/components/KeyMetricsCard';
import RiskTierChart from '@/components/RiskTierChart';
import PatientTable from '@/components/PatientTable';
import SidebarPanel from '@/components/SidebarPanel';
import { DateRange, FilterState, Patient, KeyMetrics, RiskTierBreakdown, RiskTier } from '@/types/dashboard';
import { fetchFilteredPatients, getKeyMetrics, getRiskTierBreakdown } from '@/services/mockData';

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '30',
    facility: null,
    state: null,
    provider: null,
    riskTier: null,
    cognitiveImpairment: null,
    dualStatus: null,
  });
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [keyMetrics, setKeyMetrics] = useState<KeyMetrics>({
    totalPatients: 0,
    percentDualEligible: 0,
    percentCognitiveImpairment: 0,
    avgHccScore: 0,
    highRiskPatients: 0,
  });
  const [riskTierBreakdown, setRiskTierBreakdown] = useState<RiskTierBreakdown>({
    tier1Percent: 0,
    tier2Percent: 0,
    tier3Percent: 0,
    tier4Percent: 0,
  });
  
  // Update data when filters change
  useEffect(() => {
    const filteredPatients = fetchFilteredPatients(filters);
    const metrics = getKeyMetrics(filteredPatients);
    const breakdown = getRiskTierBreakdown(filteredPatients);
    
    setPatients(filteredPatients);
    setKeyMetrics(metrics);
    setRiskTierBreakdown(breakdown);
  }, [filters]);
  
  // Filter handlers
  const handleDateRangeChange = (value: DateRange) => {
    setFilters(prev => ({ ...prev, dateRange: value }));
  };
  
  const handleFacilityChange = (value: string | null) => {
    setFilters(prev => ({ ...prev, facility: value }));
  };
  
  const handleStateChange = (value: string | null) => {
    setFilters(prev => ({ ...prev, state: value }));
  };
  
  const handleProviderChange = (value: string | null) => {
    setFilters(prev => ({ ...prev, provider: value }));
  };
  
  const handleRiskTierChange = (value: RiskTier | null) => {
    setFilters(prev => ({ ...prev, riskTier: value }));
  };
  
  const handleCognitiveImpairmentChange = (value: boolean | null) => {
    setFilters(prev => ({ ...prev, cognitiveImpairment: value }));
  };
  
  const handleDualStatusChange = (value: boolean | null) => {
    setFilters(prev => ({ ...prev, dualStatus: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Header
            dateRange={filters.dateRange}
            onDateRangeChange={handleDateRangeChange}
            facility={filters.facility}
            onFacilityChange={handleFacilityChange}
            state={filters.state}
            onStateChange={handleStateChange}
            provider={filters.provider}
            onProviderChange={handleProviderChange}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="mb-6">
              <KeyMetricsCard metrics={keyMetrics} />
            </div>
            
            <div className="mb-6">
              <RiskTierChart breakdown={riskTierBreakdown} />
            </div>
            
            <div>
              <PatientTable patients={patients} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <SidebarPanel
              riskTier={filters.riskTier}
              onRiskTierChange={handleRiskTierChange}
              cognitiveImpairment={filters.cognitiveImpairment}
              onCognitiveImpairmentChange={handleCognitiveImpairmentChange}
              dualStatus={filters.dualStatus}
              onDualStatusChange={handleDualStatusChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
