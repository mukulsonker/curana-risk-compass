
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Legend } from 'recharts';

interface TierMetric {
  name: string;
  value: number;
  maxValue: number;
  color: string;
}

interface TierData {
  metrics: TierMetric[];
  description: string;
  icon: JSX.Element;
  headerColor: string;
  title: string;
}

const TierBreakdownWidget = () => {
  const [selectedTier, setSelectedTier] = useState<number>(1);
  
  const tierColors = {
    tier1: '#ea384c',
    tier2: '#f97316',
    tier3: '#fbbf24',
    tier4: '#22c55e',
  };
  
  const tierData: Record<string, TierData> = {
    tier1: {
      title: 'Tier 1 (Critical Risk)',
      headerColor: 'bg-red-50 border-l-4 border-l-red-500',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      description: 'Patients with the highest complexity across clinical, cognitive, and social domains.',
      metrics: [
        { name: 'Chronic Conditions', value: 4.8, maxValue: 6, color: 'bg-red-500' },
        { name: 'Cognitive Decline', value: 80, maxValue: 100, color: 'bg-red-500' },
        { name: 'Frailty Index', value: 85, maxValue: 100, color: 'bg-red-500' },
        { name: 'ED Visits (yearly avg)', value: 3.2, maxValue: 5, color: 'bg-red-500' },
        { name: 'Hospitalizations (yearly)', value: 2.1, maxValue: 4, color: 'bg-red-500' },
        { name: 'ADL Dependencies', value: 3.5, maxValue: 6, color: 'bg-red-500' },
        { name: 'Medication Count', value: 12.3, maxValue: 15, color: 'bg-red-500' },
        { name: 'Social Support Score', value: 25, maxValue: 100, color: 'bg-red-500' },
        { name: 'Housing Stability', value: 30, maxValue: 100, color: 'bg-red-500' },
        { name: 'Caregiver Burden', value: 85, maxValue: 100, color: 'bg-red-500' },
      ]
    },
    tier2: {
      title: 'Tier 2 (High Risk)',
      headerColor: 'bg-orange-50 border-l-4 border-l-orange-500',
      icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
      description: 'Patients with multiple risk factors that suggest moderate to high likelihood of adverse outcomes.',
      metrics: [
        { name: 'Chronic Conditions', value: 2.6, maxValue: 6, color: 'bg-orange-500' },
        { name: 'Cognitive Decline', value: 40, maxValue: 100, color: 'bg-orange-500' },
        { name: 'Frailty Index', value: 55, maxValue: 100, color: 'bg-orange-500' },
        { name: 'ED Visits (yearly avg)', value: 1.3, maxValue: 5, color: 'bg-orange-500' },
        { name: 'Hospitalizations (yearly)', value: 0.8, maxValue: 4, color: 'bg-orange-500' },
        { name: 'ADL Dependencies', value: 1.2, maxValue: 6, color: 'bg-orange-500' },
        { name: 'Medication Count', value: 8.5, maxValue: 15, color: 'bg-orange-500' },
        { name: 'Social Support Score', value: 45, maxValue: 100, color: 'bg-orange-500' },
        { name: 'Missed Appointments', value: 2.4, maxValue: 5, color: 'bg-orange-500' },
        { name: 'Behavioral Health Score', value: 65, maxValue: 100, color: 'bg-orange-500' },
      ]
    },
    tier3: {
      title: 'Tier 3 (Moderate Risk)',
      headerColor: 'bg-yellow-50 border-l-4 border-l-yellow-400',
      icon: <Info className="h-5 w-5 text-yellow-600" />,
      description: 'Generally stable patients with some chronic conditions or social barriers but lower immediate risk.',
      metrics: [
        { name: 'Chronic Conditions', value: 1.5, maxValue: 6, color: 'bg-yellow-400' },
        { name: 'Cognitive Decline', value: 20, maxValue: 100, color: 'bg-yellow-400' },
        { name: 'Frailty Index', value: 35, maxValue: 100, color: 'bg-yellow-400' },
        { name: 'ED Visits (yearly avg)', value: 0.5, maxValue: 5, color: 'bg-yellow-400' },
        { name: 'Hospitalizations (yearly)', value: 0.2, maxValue: 4, color: 'bg-yellow-400' },
        { name: 'ADL Dependencies', value: 0.7, maxValue: 6, color: 'bg-yellow-400' },
        { name: 'Medication Count', value: 5.2, maxValue: 15, color: 'bg-yellow-400' },
        { name: 'Preventive Care Gaps', value: 1.8, maxValue: 5, color: 'bg-yellow-400' },
        { name: 'Social Support Score', value: 65, maxValue: 100, color: 'bg-yellow-400' },
        { name: 'Fall Risk Score', value: 40, maxValue: 100, color: 'bg-yellow-400' },
      ]
    },
    tier4: {
      title: 'Tier 4 (Low Risk)',
      headerColor: 'bg-green-50 border-l-4 border-l-green-500',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      description: 'Low-acuity patients with stable health status, good functional ability, and no urgent social or medical concerns.',
      metrics: [
        { name: 'Chronic Conditions', value: 0.7, maxValue: 6, color: 'bg-green-500' },
        { name: 'Cognitive Decline', value: 5, maxValue: 100, color: 'bg-green-500' },
        { name: 'Frailty Index', value: 10, maxValue: 100, color: 'bg-green-500' },
        { name: 'ED Visits (yearly avg)', value: 0.1, maxValue: 5, color: 'bg-green-500' },
        { name: 'Hospitalizations (yearly)', value: 0, maxValue: 4, color: 'bg-green-500' },
        { name: 'ADL Dependencies', value: 0.1, maxValue: 6, color: 'bg-green-500' },
        { name: 'Medication Count', value: 2.1, maxValue: 15, color: 'bg-green-500' },
        { name: 'Preventive Care Compliance', value: 90, maxValue: 100, color: 'bg-green-500' },
        { name: 'Physical Activity Score', value: 85, maxValue: 100, color: 'bg-green-500' },
        { name: 'Social Engagement', value: 80, maxValue: 100, color: 'bg-green-500' },
      ]
    },
  };

  // Prepare data for bar chart
  const getChartData = () => {
    const tier = `tier${selectedTier}`;
    return tierData[tier].metrics.map(metric => ({
      name: metric.name,
      value: (metric.value / metric.maxValue) * 100,
      actualValue: metric.value,
      maxValue: metric.maxValue,
    }));
  };

  // Function to handle tier selection
  const handleTierSelect = (tier: number) => {
    setSelectedTier(tier);
  };

  const tierKey = `tier${selectedTier}`;
  const currentTierData = tierData[tierKey];
  const chartData = getChartData();

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Risk Tier Detailed Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tier selection buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3, 4].map((tier) => (
            <button
              key={tier}
              onClick={() => handleTierSelect(tier)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedTier === tier
                  ? `bg-${tier === 1 ? 'red' : tier === 2 ? 'orange' : tier === 3 ? 'yellow' : 'green'}-500 text-white`
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Tier {tier}
            </button>
          ))}
        </div>

        {/* Current tier header */}
        <div className={`p-4 rounded ${currentTierData.headerColor}`}>
          <div className="flex items-center gap-2">
            {currentTierData.icon}
            <h3 className="font-semibold">{currentTierData.title}</h3>
          </div>
          <p className="mt-2 text-sm">{currentTierData.description}</p>
        </div>
        
        {/* Metrics visualization */}
        <div className="w-full h-80">
          <ChartContainer 
            config={{
              tier1: { color: tierColors.tier1 },
              tier2: { color: tierColors.tier2 },
              tier3: { color: tierColors.tier3 },
              tier4: { color: tierColors.tier4 },
            }}
          >
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                width={140}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    formatter={(value, name, entry) => {
                      const item = entry.payload;
                      return [`${item.actualValue} / ${item.maxValue} (${item.value.toFixed(0)}%)`];
                    }}
                  />
                }
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={tierColors[tierKey as keyof typeof tierColors]} 
                    opacity={0.8 + (0.2 * (entry.value / 100))}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TierBreakdownWidget;
