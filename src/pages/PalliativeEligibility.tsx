
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PalliativeEligibility = () => {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Palliative Care Eligibility
      </h1>
      
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Palliative Care Candidate List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            This page will contain a list of patients who may benefit from palliative care 
            services based on their clinical profile, risk tier, and other factors. The list
            helps providers identify candidates for palliative care consultations.
          </p>
          <p className="text-gray-600 italic">
            This feature is currently under development and will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PalliativeEligibility;
