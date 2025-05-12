
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PatientTable from '@/components/PatientTable';
import { FilterState, Patient } from '@/types/dashboard';
import { fetchFilteredPatients } from '@/services/mockData';

const PatientRiskTable = () => {
  const [filters] = useState<FilterState>({
    dateRange: '30',
    facility: null,
    state: null,
    provider: null,
    riskTier: null,
    cognitiveImpairment: null,
    dualStatus: null,
  });
  
  const [patients] = useState<Patient[]>(fetchFilteredPatients(filters));

  return (
    <div className="container p-4 mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
        <Link to="/risk-tiers">
          <Button variant="secondary" size="sm">
            View Risk Tier Definitions
          </Button>
        </Link>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Patient Risk Table
      </h1>
      <p className="text-gray-600 mb-6">
        Detailed view of all patients with their risk assessment data
      </p>
      
      <PatientTable patients={patients} />
    </div>
  );
};

export default PatientRiskTable;
