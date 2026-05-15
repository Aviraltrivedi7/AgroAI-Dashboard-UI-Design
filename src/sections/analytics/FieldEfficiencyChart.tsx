import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import { fieldEfficiencyData } from '@/data/mockData';

export function FieldEfficiencyChart() {
  return (
    <div className="bg-white dark:bg-white/5 rounded-card shadow-card border border-transparent dark:border-white/5 p-5">
      <h4 className="font-semibold text-text-primary dark:text-white mb-4">Field Efficiency</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={fieldEfficiencyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,94,32,0.1)" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8B9686' }} axisLine={{ stroke: '#EDF1E8' }} />
          <YAxis tick={{ fontSize: 11, fill: '#8B9686' }} axisLine={{ stroke: '#EDF1E8' }} />
          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 12px 48px rgba(0,0,0,0.15)', fontSize: '13px' }} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="value" name="Visits/Day" fill="#1B5E20" radius={[4, 4, 0, 0]} animationDuration={800} />
          <Line type="monotone" dataKey="value2" name="Target" stroke="#8BC34A" strokeWidth={2} strokeDasharray="5 5" dot={false} animationDuration={800} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
