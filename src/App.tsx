import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDarkMode } from '@/hooks/useDarkMode';
import { AppLayout } from '@/components/layout/AppLayout';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import VisitPlannerPage from '@/pages/VisitPlannerPage';
import RecommendationsPage from '@/pages/RecommendationsPage';
import RiskAnalyzerPage from '@/pages/RiskAnalyzerPage';
import AnalyticsPage from '@/pages/AnalyticsPage';

function AppContent() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="*"
          element={
            <AppLayout theme={theme} toggleTheme={toggleTheme}>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/visit-planner" element={<VisitPlannerPage />} />
                <Route path="/recommendations" element={<RecommendationsPage />} />
                <Route path="/risk-analyzer" element={<RiskAnalyzerPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="*" element={<DashboardPage />} />
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return <AppContent />;
}
