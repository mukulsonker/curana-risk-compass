
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RiskTierDefinitions from "./pages/RiskTierDefinitions";
import CareGapReports from "./pages/CareGapReports";
import PalliativeEligibility from "./pages/PalliativeEligibility";
import PatientRiskTable from "./pages/PatientRiskTable";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/risk-tiers" element={<RiskTierDefinitions />} />
          <Route path="/care-gaps" element={<CareGapReports />} />
          <Route path="/palliative-eligibility" element={<PalliativeEligibility />} />
          <Route path="/patient-risk-table" element={<PatientRiskTable />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
