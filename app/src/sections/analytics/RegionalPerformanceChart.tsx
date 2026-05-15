import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { regionalPerformanceData } from '@/data/mockData';

export function RegionalPerformanceChart() {
  return (
    <div className="bg-white dark:bg-white/5 rounded-card shadow-card border border-transparent dark:border-white/5 p-5">
      <h4 className="font-semibold text-text-primary dark:text-white mb-4">Regional Performance</h4>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={regionalPerformanceData}>
          <PolarGrid stroke="rgba(27,94,32,0.1)" />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#8B9686' }} />
          <PolarRadiusAxis tick={{ fontSize: 9, fill: '#8B9686' }} domain={[0, 100]} />
          <Radar name="Your Territory" dataKey="yourTerritory" stroke="#1B5E20" fill="#1B5E20" fillOpacity={0.3} strokeWidth={2} animationDuration={800} />
          <Radar name="Average" dataKey="average" stroke="#8B9686" fill="#8B9686" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" animationDuration={800} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 12px 48px rgba(0,0,0,0.15)', fontSize: '13px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
