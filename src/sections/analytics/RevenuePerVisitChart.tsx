import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { revenuePerVisitData } from '@/data/mockData';

export function RevenuePerVisitChart() {
  return (
    <div className="bg-white dark:bg-white/5 rounded-card shadow-card border border-transparent dark:border-white/5 p-5">
      <h4 className="font-semibold text-text-primary dark:text-white mb-4">Revenue Per Visit</h4>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={revenuePerVisitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,94,32,0.1)" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8B9686' }} axisLine={{ stroke: '#EDF1E8' }} />
          <YAxis tick={{ fontSize: 11, fill: '#8B9686' }} axisLine={{ stroke: '#EDF1E8' }} tickFormatter={(v) => `Rs.${v/1000}K`} />
          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 12px 48px rgba(0,0,0,0.15)', fontSize: '13px' }} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="value" name="Revenue" fill="#8BC34A" radius={[4, 4, 0, 0]} animationDuration={800} />
          <Line type="monotone" dataKey="value2" name="Trend" stroke="#1B5E20" strokeWidth={2} dot={{ r: 3 }} animationDuration={800} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
