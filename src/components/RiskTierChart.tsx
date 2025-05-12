
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RiskTierBreakdown } from '@/types/dashboard';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

interface RiskTierChartProps {
  breakdown: RiskTierBreakdown;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
  tier: number;
  description: string;
}

const RiskTierChart = ({ breakdown }: RiskTierChartProps) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [selectedTier, setSelectedTier] = useState<ChartData | null>(null);
  
  useEffect(() => {
    setData([
      { 
        name: 'Tier 1 (Critical Risk)', 
        value: breakdown.tier1Percent, 
        color: '#EF5350', 
        tier: 1,
        description: 'Patients with the highest complexity across clinical, cognitive, and social domains.'
      },
      { 
        name: 'Tier 2 (High Risk)', 
        value: breakdown.tier2Percent, 
        color: '#FF9800', 
        tier: 2,
        description: 'Patients with multiple risk factors that suggest moderate to high likelihood of adverse outcomes.'
      },
      { 
        name: 'Tier 3 (Moderate Risk)', 
        value: breakdown.tier3Percent, 
        color: '#FDD835', 
        tier: 3,
        description: 'Generally stable patients with some chronic conditions or social barriers but lower immediate risk.'
      },
      { 
        name: 'Tier 4 (Low Risk)', 
        value: breakdown.tier4Percent, 
        color: '#66BB6A', 
        tier: 4,
        description: 'Low-acuity patients with stable health status and good functional ability.'
      },
    ]);
  }, [breakdown]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    
    const textAnchor = cos >= 0 ? 'start' : 'end';
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}`} stroke={fill} fill="none" />
        <text x={mx} y={my} textAnchor={textAnchor} fill={fill} fontSize={12} dominantBaseline="middle">
          {`${payload.name}: ${(percent * 100).toFixed(1)}%`}
        </text>
      </g>
    );
  };

  const handlePieClick = (data: any, index: number) => {
    setSelectedTier(data);
  };

  const getTierColor = (tier: number) => {
    switch(tier) {
      case 1: return '#EF5350';
      case 2: return '#FF9800';
      case 3: return '#FDD835';
      case 4: return '#66BB6A';
      default: return '#999999';
    }
  };

  const getTierScoreRange = (tier: number) => {
    switch(tier) {
      case 1: return '80-100';
      case 2: return '60-79';
      case 3: return '40-59';
      case 4: return '<40';
      default: return '';
    }
  };

  return (
    <Card className="bg-white h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl text-gray-800">Risk Tier Breakdown</CardTitle>
        <Link to="/risk-tiers" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
          <Info className="h-4 w-4" />
          View Risk Tiers Details
        </Link>
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
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              onClick={handlePieClick}
              cursor="pointer"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Percentage']} 
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>

        {selectedTier && (
          <Dialog open={!!selectedTier} onOpenChange={(open) => !open && setSelectedTier(null)}>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <span 
                    className="inline-block w-4 h-4 rounded-sm" 
                    style={{ backgroundColor: getTierColor(selectedTier.tier) }}
                  ></span>
                  {selectedTier.name} Details
                </DialogTitle>
                <DialogDescription>
                  Composite Score: <strong>{getTierScoreRange(selectedTier.tier)}</strong>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Profile:</h3>
                  <p>{selectedTier.description}</p>
                </div>
                
                {selectedTier.tier === 1 && (
                  <>
                    <div>
                      <h3 className="font-semibold">Typical Characteristics:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>≥4 chronic conditions (e.g., CHF, COPD, CKD)</li>
                        <li>Diagnosed dementia or significant cognitive impairment</li>
                        <li>High frailty index</li>
                        <li>Dual eligible with severe social risk</li>
                        <li>2+ ED visits or hospitalizations in past 6–12 months</li>
                        <li>Functional decline or ≥2 ADL dependencies</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold">Recommended Actions:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Assigned RN complex care manager</li>
                        <li>Weekly interdisciplinary team reviews</li>
                        <li>Palliative care consult or goals of care discussion</li>
                        <li>Home visit or in-person assessment</li>
                        <li>Medication reconciliation and social services involvement</li>
                      </ul>
                    </div>
                  </>
                )}
                
                {selectedTier.tier === 2 && (
                  <>
                    <div>
                      <h3 className="font-semibold">Typical Characteristics:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>2–3 chronic diseases (e.g., diabetes, hypertension, arthritis)</li>
                        <li>Mild to moderate cognitive issues</li>
                        <li>Recent ED visit or SNF stay</li>
                        <li>Behavioral health needs (e.g., depression, anxiety, SMI)</li>
                        <li>Missed follow-ups or medication adherence concerns</li>
                        <li>Social determinants such as isolation, food insecurity</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold">Recommended Actions:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Monthly care coordination check-ins</li>
                        <li>Behavioral health screening/support</li>
                        <li>Social work referral</li>
                        <li>Preventive care reminders</li>
                        <li>Engagement of caregivers in care plan</li>
                      </ul>
                    </div>
                  </>
                )}
                
                {selectedTier.tier === 3 && (
                  <>
                    <div>
                      <h3 className="font-semibold">Typical Characteristics:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>1–2 chronic conditions, usually well-controlled</li>
                        <li>No recent ED/hospitalizations</li>
                        <li>May have mild functional limitations</li>
                        <li>Dual eligible but with support systems in place</li>
                        <li>Gaps in preventive care (e.g., missed A1C or screenings)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold">Recommended Actions:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Quarterly wellness outreach</li>
                        <li>Preventive services monitoring</li>
                        <li>Fall risk screening</li>
                        <li>Annual care plan updates</li>
                        <li>Monitor for escalation to Tier 2</li>
                      </ul>
                    </div>
                  </>
                )}
                
                {selectedTier.tier === 4 && (
                  <>
                    <div>
                      <h3 className="font-semibold">Typical Characteristics:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>No major chronic illnesses</li>
                        <li>Independent in ADLs</li>
                        <li>Cognitively intact</li>
                        <li>No ED or inpatient visits in the last year</li>
                        <li>Engaged in routine care</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold">Recommended Actions:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Annual wellness visit</li>
                        <li>Routine screenings</li>
                        <li>Encourage physical activity and social engagement</li>
                        <li>Monitor for early risk factors</li>
                      </ul>
                    </div>
                  </>
                )}
                
                <div className="pt-2">
                  <Link to="/risk-tiers" className="text-blue-600 hover:underline">
                    See full Risk Tier Definitions
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskTierChart;
