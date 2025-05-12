
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Patient, RiskTier } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PatientTableProps {
  patients: Patient[];
}

type SortField = 'name' | 'age' | 'hccScore' | 'riskTier' | 'lastEDVisit';
type SortDirection = 'asc' | 'desc';

const PatientTable = ({ patients }: PatientTableProps) => {
  const [sortField, setSortField] = useState<SortField>('riskTier');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);
  const patientsPerPage = 10;
  
  // Sort patients
  const sortedPatients = [...patients].sort((a, b) => {
    switch (sortField) {
      case 'name':
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'age':
        return sortDirection === 'asc' ? a.age - b.age : b.age - a.age;
      case 'hccScore':
        return sortDirection === 'asc' ? a.hccScore - b.hccScore : b.hccScore - a.hccScore;
      case 'riskTier':
        return sortDirection === 'asc' ? a.riskTier - b.riskTier : b.riskTier - a.riskTier;
      case 'lastEDVisit':
        return sortDirection === 'asc'
          ? new Date(a.lastEDVisit).getTime() - new Date(b.lastEDVisit).getTime()
          : new Date(b.lastEDVisit).getTime() - new Date(a.lastEDVisit).getTime();
      default:
        return 0;
    }
  });
  
  // Paginate
  const paginatedPatients = sortedPatients.slice(
    (page - 1) * patientsPerPage,
    page * patientsPerPage
  );
  
  const totalPages = Math.ceil(sortedPatients.length / patientsPerPage);
  
  // Toggle sort
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get risk tier color
  const getRiskTierColor = (tier: RiskTier) => {
    switch (tier) {
      case 1: return 'bg-tier1 text-white';
      case 2: return 'bg-tier2 text-white';
      case 3: return 'bg-tier3 text-black';
      case 4: return 'bg-tier4 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Patient Risk Table</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead onClick={() => toggleSort('name')} className="cursor-pointer">
                Name {sortField === 'name' && (
                  sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                )}
              </TableHead>
              <TableHead onClick={() => toggleSort('age')} className="cursor-pointer">
                Age {sortField === 'age' && (
                  sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                )}
              </TableHead>
              <TableHead onClick={() => toggleSort('hccScore')} className="cursor-pointer">
                HCC Score {sortField === 'hccScore' && (
                  sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                )}
              </TableHead>
              <TableHead>Dementia</TableHead>
              <TableHead>Dual Eligible</TableHead>
              <TableHead onClick={() => toggleSort('riskTier')} className="cursor-pointer">
                Risk Tier {sortField === 'riskTier' && (
                  sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                )}
              </TableHead>
              <TableHead onClick={() => toggleSort('lastEDVisit')} className="cursor-pointer">
                Last ED Visit {sortField === 'lastEDVisit' && (
                  sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                )}
              </TableHead>
              <TableHead>Flagged Gaps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-mono">{patient.id}</TableCell>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.hccScore.toFixed(2)}</TableCell>
                <TableCell>{patient.dementia ? 'Yes' : 'No'}</TableCell>
                <TableCell>{patient.dualEligible ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Badge className={`${getRiskTierColor(patient.riskTier)} font-bold`}>
                    Tier {patient.riskTier}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(patient.lastEDVisit)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {patient.flaggedGaps.map((gap, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {gap}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {((page - 1) * patientsPerPage) + 1} to {Math.min(page * patientsPerPage, patients.length)} of {patients.length} patients
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientTable;
