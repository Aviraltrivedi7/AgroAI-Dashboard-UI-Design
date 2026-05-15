import { RefreshCw } from 'lucide-react';

const stops = [
  { x: 15, y: 60, num: 1, name: 'Retailer R12' },
  { x: 40, y: 30, num: 2, name: 'Village A' },
  { x: 65, y: 55, num: 3, name: 'Cluster B' },
  { x: 88, y: 25, num: 4, name: 'Retailer R08' },
];

export function RouteVisualization() {
  const pathD = stops.reduce((acc, stop, i) => {
    return i === 0 ? `M${stop.x},${stop.y}` : `${acc} L${stop.x},${stop.y}`;
  }, '');

  return (
    <div className="bg-white dark:bg-white/5 rounded-card shadow-card border border-transparent dark:border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-light-gray dark:border-white/10">
        <h4 className="font-semibold text-text-primary dark:text-white">Optimized Route</h4>
        <span className="text-xs text-text-muted">4 stops | 28km | 3.5hrs</span>
      </div>

      {/* Map */}
      <div className="relative h-[300px] bg-light-gray dark:bg-white/5 m-4 rounded-xl overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 opacity-20"
             style={{ backgroundImage: 'linear-gradient(rgba(27,94,32,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(27,94,32,0.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1B5E20" />
              <stop offset="100%" stopColor="#8BC34A" />
            </linearGradient>
          </defs>
          <path
            d={pathD}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-[dash_2s_ease-out_forwards]"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: 0,
            }}
          />
        </svg>

        {/* Stops */}
        {stops.map((stop, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: `${stop.x}%`, top: `${stop.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative group">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-white">{stop.num}</span>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-text-primary dark:text-white opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-[#1A1D18] px-2 py-0.5 rounded shadow-sm">
                {stop.name}
              </div>
            </div>
          </div>
        ))}

        {/* Recalculate Button */}
        <button className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-button bg-white dark:bg-[#1A1D18] shadow-dropdown text-sm font-medium text-text-primary dark:text-white hover:bg-light-gray transition-colors">
          <RefreshCw className="w-4 h-4" />
          Recalculate
        </button>
      </div>
    </div>
  );
}
