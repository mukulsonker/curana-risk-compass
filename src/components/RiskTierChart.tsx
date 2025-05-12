
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskTierBreakdown } from '@/types/dashboard';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface RiskTierChartProps {
  breakdown: RiskTierBreakdown;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const RiskTierChart = ({ breakdown }: RiskTierChartProps) => {
  const [data, setData] = useState<ChartData[]>([]);
  
  useEffect(() => {
    setData([
      { name: 'Tier 1 (Highest Risk)', value: breakdown.tier1Percent, color: '#EF5350' },
      { name: 'Tier 2 (High Risk)', value: breakdown.tier2Percent, color: '#FF9800' },
      { name: 'Tier 3 (Moderate Risk)', value: breakdown.tier3Percent, color: '#FDD835' },
      { name: 'Tier 4 (Low Risk)', value: breakdown.tier4Percent, color: '#66BB6A' },
    ]);
  }, [breakdown]);

  return (
    <Card className="bg-white h-[400px]">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Risk Tier Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Percentage']} 
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RiskTierChart;
