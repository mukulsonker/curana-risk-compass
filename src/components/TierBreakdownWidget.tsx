
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

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
  const [selectedTier, setSelectedTier] = useState<string>('tier1');
  
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
      ]
    },
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Risk Tier Detailed Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTier} onValueChange={setSelectedTier} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="tier1" className="text-red-600">Tier 1</TabsTrigger>
            <TabsTrigger value="tier2" className="text-orange-600">Tier 2</TabsTrigger>
            <TabsTrigger value="tier3" className="text-yellow-600">Tier 3</TabsTrigger>
            <TabsTrigger value="tier4" className="text-green-600">Tier 4</TabsTrigger>
          </TabsList>
          
          {Object.entries(tierData).map(([key, data]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className={`p-4 rounded ${data.headerColor}`}>
                <div className="flex items-center gap-2">
                  {data.icon}
                  <h3 className="font-semibold">{data.title}</h3>
                </div>
                <p className="mt-2 text-sm">{data.description}</p>
              </div>
              
              <div className="space-y-4">
                {data.metrics.map((metric, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">
                        {metric.value} {metric.name.includes('Index') || metric.name.includes('Decline') ? '%' : ''}
                      </span>
                    </div>
                    <Progress value={(metric.value / metric.maxValue) * 100} className={`h-2 ${metric.color}`} />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TierBreakdownWidget;
