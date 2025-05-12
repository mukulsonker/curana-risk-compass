
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RiskTierDefinitions = () => {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Risk Tier Definitions and Scoring Logic
      </h1>
      <p className="text-gray-600">
        Used for stratifying senior-living patients in value-based care
      </p>

      <Tabs defaultValue="tiers" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="tiers">Risk Tiers</TabsTrigger>
          <TabsTrigger value="scoring">Scoring Logic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tiers" className="space-y-6">
          {/* Tier 1 - Critical Risk */}
          <Card className="border-l-8 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <AlertCircle className="mr-2 h-5 w-5" /> Tier 1 – Critical Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2">Composite Score: 80–100</p>
              
              <h3 className="font-semibold mt-4">Profile:</h3>
              <p className="text-gray-700">
                Patients with the highest complexity across clinical, cognitive, and social domains. These individuals are at immediate risk of hospitalization, deterioration, or care fragmentation.
              </p>
              
              <h3 className="font-semibold mt-4">Typical Characteristics:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>≥4 chronic conditions (e.g., CHF, COPD, CKD)</li>
                <li>Diagnosed dementia or significant cognitive impairment</li>
                <li>High frailty index</li>
                <li>Dual eligible with severe social risk (e.g., unstable housing, caregiver absence)</li>
                <li>2+ ED visits or hospitalizations in past 6–12 months</li>
                <li>Functional decline or ≥2 ADL dependencies</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Recommended Actions:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Assigned RN complex care manager</li>
                <li>Weekly interdisciplinary team reviews</li>
                <li>Palliative care consult or goals of care discussion</li>
                <li>Home visit or in-person assessment</li>
                <li>Medication reconciliation and social services involvement</li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Tier 2 - High Risk */}
          <Card className="border-l-8 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600">
                <AlertCircle className="mr-2 h-5 w-5" /> Tier 2 – High Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2">Composite Score: 60–79</p>
              
              <h3 className="font-semibold mt-4">Profile:</h3>
              <p className="text-gray-700">
                Patients with multiple risk factors that suggest moderate to high likelihood of adverse outcomes without proactive intervention.
              </p>
              
              <h3 className="font-semibold mt-4">Typical Characteristics:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>2–3 chronic diseases (e.g., diabetes, hypertension, arthritis)</li>
                <li>Mild to moderate cognitive issues</li>
                <li>Recent ED visit or SNF stay</li>
                <li>Behavioral health needs (e.g., depression, anxiety, SMI)</li>
                <li>Missed follow-ups or medication adherence concerns</li>
                <li>Social determinants such as isolation, food insecurity</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Recommended Actions:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Monthly care coordination check-ins</li>
                <li>Behavioral health screening/support</li>
                <li>Social work referral</li>
                <li>Preventive care reminders</li>
                <li>Engagement of caregivers in care plan</li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Tier 3 - Moderate Risk */}
          <Card className="border-l-8 border-l-yellow-400">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-600">
                <Info className="mr-2 h-5 w-5" /> Tier 3 – Moderate Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2">Composite Score: 40–59</p>
              
              <h3 className="font-semibold mt-4">Profile:</h3>
              <p className="text-gray-700">
                Generally stable patients with some chronic conditions or social barriers but lower immediate risk. May show early signs of decline or gaps in care.
              </p>
              
              <h3 className="font-semibold mt-4">Typical Characteristics:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>1–2 chronic conditions, usually well-controlled</li>
                <li>No recent ED/hospitalizations</li>
                <li>May have mild functional limitations</li>
                <li>Dual eligible but with support systems in place</li>
                <li>Gaps in preventive care (e.g., missed A1C or screenings)</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Recommended Actions:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Quarterly wellness outreach</li>
                <li>Preventive services monitoring</li>
                <li>Fall risk screening</li>
                <li>Annual care plan updates</li>
                <li>Monitor for escalation to Tier 2</li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Tier 4 - Low Risk */}
          <Card className="border-l-8 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" /> Tier 4 – Low Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2">Composite Score: &lt;40</p>
              
              <h3 className="font-semibold mt-4">Profile:</h3>
              <p className="text-gray-700">
                Low-acuity patients with stable health status, good functional ability, and no urgent social or medical concerns.
              </p>
              
              <h3 className="font-semibold mt-4">Typical Characteristics:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>No major chronic illnesses</li>
                <li>Independent in ADLs</li>
                <li>Cognitively intact</li>
                <li>No ED or inpatient visits in the last year</li>
                <li>Engaged in routine care</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Recommended Actions:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Annual wellness visit</li>
                <li>Routine screenings</li>
                <li>Encourage physical activity and social engagement</li>
                <li>Monitor for early risk factors</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scoring Methodology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Clinical Factors (40% of total score)</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Number of chronic conditions (0-20 points)</li>
                    <li>Recent hospitalizations or ED visits (0-10 points)</li>
                    <li>Polypharmacy (≥5 medications) (0-5 points)</li>
                    <li>Lab abnormalities (0-5 points)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Functional Status (25% of total score)</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>ADL dependencies (0-15 points)</li>
                    <li>Mobility limitations (0-5 points)</li>
                    <li>Fall risk (0-5 points)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Cognitive Health (15% of total score)</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Dementia diagnosis (0-10 points)</li>
                    <li>Cognitive assessment scores (0-5 points)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Social Determinants (20% of total score)</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Dual eligibility status (0-5 points)</li>
                    <li>Social isolation (0-5 points)</li>
                    <li>Food/housing insecurity (0-5 points)</li>
                    <li>Caregiver support (0-5 points)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold text-lg">Risk Tier Assignment</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="inline-block w-4 h-4 bg-red-500 mr-2"></span> <strong>Tier 1 (Critical Risk):</strong> 80-100 points</li>
                  <li><span className="inline-block w-4 h-4 bg-orange-500 mr-2"></span> <strong>Tier 2 (High Risk):</strong> 60-79 points</li>
                  <li><span className="inline-block w-4 h-4 bg-yellow-400 mr-2"></span> <strong>Tier 3 (Moderate Risk):</strong> 40-59 points</li>
                  <li><span className="inline-block w-4 h-4 bg-green-500 mr-2"></span> <strong>Tier 4 (Low Risk):</strong> &lt;40 points</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskTierDefinitions;
