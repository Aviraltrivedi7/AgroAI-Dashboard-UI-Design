import { useState } from 'react';
import { cn } from '@/lib/utils';

type MapTab = 'risk' | 'visits' | 'retailers';

const tabs: { id: MapTab; label: string }[] = [
  { id: 'risk', label: 'Risk' },
  { id: 'visits', label: 'Visits' },
  { id: 'retailers', label: 'Retailers' },
];

const mapDots = [
  { x: 20, y: 30, type: 'risk' as const, label: 'Rampur' },
  { x: 45, y: 55, type: 'risk' as const, label: 'Dharnai' },
  { x: 70, y: 25, type: 'visits' as const, label: 'Sonepur' },
  { x: 35, y: 70, type: 'visits' as const, label: 'Cluster B' },
  { x: 60, y: 60, type: 'retailers' as const, label: 'R12 Store' },
  { x: 15, y: 55, type: 'retailers' as const, label: 'R08 Kendra' },
  { x: 80, y: 45, type: 'risk' as const, label: 'High Risk Zone' },
  { x: 50, y: 35, type: 'visits' as const, label: 'Priority' },
];

const dotColors = {
  risk: 'bg-danger-red',
  visits: 'bg-info-blue',
  retailers: 'bg-lime-green',
};

export function MapWidget() {
  const [activeTab, setActiveTab] = useState<MapTab>('risk');

  return (
    <div className="bg-white dark:bg-white/5 rounded-card shadow-card border border-transparent dark:border-white/5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-light-gray dark:border-white/10">
        <h3 className="font-semibold text-text-primary dark:text-white">Territory Overview</h3>
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                activeTab === tab.id
                  ? 'text-deep-green dark:text-lime-green bg-deep-green/10 dark:bg-lime-green/10'
                  : 'text-text-muted hover:text-text-primary dark:hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="relative flex-1 min-h-[300px] bg-light-gray dark:bg-white/5 m-4 rounded-xl overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(27,94,32,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,94,32,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Dots */}
        {mapDots.map((dot, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <div
                className={cn(
                  'w-3 h-3 rounded-full animate-map-pulse',
                  dotColors[dot.type]
                )}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-white dark:bg-[#1A1D18] rounded text-[10px] font-medium text-text-primary dark:text-white shadow-dropdown whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                {dot.label}
              </div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-4 px-4 py-2 rounded-full bg-white/90 dark:bg-[#1A1D18]/90 backdrop-blur-sm shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-danger-red" />
            <span className="text-[10px] text-text-muted">Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-info-blue" />
            <span className="text-[10px] text-text-muted">Visits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-lime-green" />
            <span className="text-[10px] text-text-muted">Retailers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
