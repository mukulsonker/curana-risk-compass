
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyMetrics } from '@/types/dashboard';

interface KeyMetricsCardProps {
  metrics: KeyMetrics;
}

const KeyMetricsCard = ({ metrics }: KeyMetricsCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Total Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{metrics.totalPatients.toLocaleString()}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">% Dual Eligible</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{metrics.percentDualEligible.toFixed(1)}%</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">% with Cognitive Impairment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{metrics.percentCognitiveImpairment.toFixed(1)}%</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Avg HCC Score</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{metrics.avgHccScore.toFixed(2)}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">High-Risk Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-healthcare-red-dark">{metrics.highRiskPatients.toLocaleString()}</p>
          <p className="text-xs text-gray-500">(Tier 1 & 2)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyMetricsCard;
