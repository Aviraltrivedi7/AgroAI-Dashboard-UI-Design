import { FieldEfficiencyChart } from '@/sections/analytics/FieldEfficiencyChart';
import { RevenuePerVisitChart } from '@/sections/analytics/RevenuePerVisitChart';
import { RecommendationAcceptanceChart } from '@/sections/analytics/RecommendationAcceptanceChart';
import { RegionalPerformanceChart } from '@/sections/analytics/RegionalPerformanceChart';
import { CropRiskTrendsChart } from '@/sections/analytics/CropRiskTrendsChart';
import { StockUtilizationChart } from '@/sections/analytics/StockUtilizationChart';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-white">
          Territory Analytics
        </h2>
        <span className="px-4 py-2 rounded-button bg-light-gray dark:bg-white/5 text-sm font-medium text-text-primary dark:text-white cursor-pointer">
          Jan 1 - Jan 14, 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <FieldEfficiencyChart />
        <RevenuePerVisitChart />
        <RecommendationAcceptanceChart />
        <RegionalPerformanceChart />
        <CropRiskTrendsChart />
        <StockUtilizationChart />
      </div>
    </div>
  );
}
