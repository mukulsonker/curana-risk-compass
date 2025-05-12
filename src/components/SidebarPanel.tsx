
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RiskTier } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';

interface SidebarPanelProps {
  riskTier: RiskTier | null;
  onRiskTierChange: (tier: RiskTier | null) => void;
  cognitiveImpairment: boolean | null;
  onCognitiveImpairmentChange: (value: boolean | null) => void;
  dualStatus: boolean | null;
  onDualStatusChange: (value: boolean | null) => void;
}

const SidebarPanel = ({
  riskTier,
  onRiskTierChange,
  cognitiveImpairment,
  onCognitiveImpairmentChange,
  dualStatus,
  onDualStatusChange,
}: SidebarPanelProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Risk Tier</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Button 
                variant={riskTier === 1 ? "default" : "outline"} 
                size="sm"
                onClick={() => onRiskTierChange(riskTier === 1 ? null : 1)}
                className={riskTier === 1 ? "bg-tier1 hover:bg-tier1/90" : ""}
              >
                Tier 1
              </Button>
              <Button 
                variant={riskTier === 2 ? "default" : "outline"} 
                size="sm"
                onClick={() => onRiskTierChange(riskTier === 2 ? null : 2)}
                className={riskTier === 2 ? "bg-tier2 hover:bg-tier2/90" : ""}
              >
                Tier 2
              </Button>
              <Button 
                variant={riskTier === 3 ? "default" : "outline"} 
                size="sm"
                onClick={() => onRiskTierChange(riskTier === 3 ? null : 3)}
                className={riskTier === 3 ? "bg-tier3 hover:bg-tier3/90 text-black" : ""}
              >
                Tier 3
              </Button>
              <Button 
                variant={riskTier === 4 ? "default" : "outline"} 
                size="sm"
                onClick={() => onRiskTierChange(riskTier === 4 ? null : 4)}
                className={riskTier === 4 ? "bg-tier4 hover:bg-tier4/90" : ""}
              >
                Tier 4
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Cognitive Impairment</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Switch 
                checked={cognitiveImpairment === true}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onCognitiveImpairmentChange(true);
                  } else if (cognitiveImpairment === true) {
                    onCognitiveImpairmentChange(null);
                  } else {
                    onCognitiveImpairmentChange(true);
                  }
                }}
              />
              <span className="text-sm">
                {cognitiveImpairment === true ? 'Yes' : 
                 cognitiveImpairment === false ? 'No' : 'Any'}
              </span>
              
              {cognitiveImpairment !== null && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onCognitiveImpairmentChange(null)}
                  className="ml-auto text-xs h-7 px-2"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Dual Status</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Switch 
                checked={dualStatus === true}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onDualStatusChange(true);
                  } else if (dualStatus === true) {
                    onDualStatusChange(null);
                  } else {
                    onDualStatusChange(true);
                  }
                }}
              />
              <span className="text-sm">
                {dualStatus === true ? 'Eligible' : 
                 dualStatus === false ? 'Not Eligible' : 'Any'}
              </span>
              
              {dualStatus !== null && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDualStatusChange(null)}
                  className="ml-auto text-xs h-7 px-2"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Badge className="mr-2 bg-tier1">!</Badge>
            View High-Risk Patients
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Badge className="mr-2 bg-healthcare-blue">📋</Badge>
            Care Gap Reports
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Badge className="mr-2 bg-healthcare-green">✓</Badge>
            Palliative Eligible List
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarPanel;
