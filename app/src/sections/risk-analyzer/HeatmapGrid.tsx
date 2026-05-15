import { useState, useMemo } from 'react';
import { generateHeatmapData } from '@/data/mockData';
import type { HeatmapCell } from '@/types';

const riskColors: Record<string, string> = {
  low: 'bg-lime-green/40 hover:bg-lime-green/60',
  medium: 'bg-accent-yellow/50 hover:bg-accent-yellow/70',
  high: 'bg-orange-500/50 hover:bg-orange-500/70',
  critical: 'bg-danger-red/60 hover:bg-danger-red/80 animate-map-pulse',
};

export function HeatmapGrid() {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);
  const data = useMemo(() => generateHeatmapData(), []);

  return (
    <div className="bg-white dark:bg-white/5 rounded-card shadow-card border border-transparent dark:border-white/5 overflow-hidden">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 px-5 py-4 border-b border-light-gray dark:border-white/10">
        <select className="px-3 py-2 rounded-button bg-light-gray dark:bg-white/5 text-sm text-text-primary dark:text-white border-none outline-none cursor-pointer">
          <option>Crop: Rice</option>
          <option>Crop: Cotton</option>
          <option>Crop: Wheat</option>
        </select>
        <select className="px-3 py-2 rounded-button bg-light-gray dark:bg-white/5 text-sm text-text-primary dark:text-white border-none outline-none cursor-pointer">
          <option>Date: Last 7 days</option>
          <option>Date: Last 30 days</option>
        </select>
        <select className="px-3 py-2 rounded-button bg-light-gray dark:bg-white/5 text-sm text-text-primary dark:text-white border-none outline-none cursor-pointer">
          <option>Risk: All</option>
          <option>Risk: High+</option>
          <option>Risk: Critical</option>
        </select>

        {/* Legend */}
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-text-muted">Risk Level:</span>
          <div className="w-24 h-2 rounded-full bg-gradient-to-r from-lime-green via-accent-yellow via-orange-500 to-danger-red" />
        </div>
      </div>

      {/* Grid */}
      <div className="relative p-4">
        <div
          className="grid gap-[2px] rounded-lg overflow-hidden"
          style={{ gridTemplateColumns: 'repeat(20, 1fr)', aspectRatio: '20/15' }}
        >
          {data.map((cell) => (
            <div
              key={cell.id}
              className={`${riskColors[cell.risk]} transition-all duration-200 cursor-crosshair`}
              onMouseEnter={() => setHoveredCell(cell)}
              onMouseLeave={() => setHoveredCell(null)}
            />
          ))}
        </div>

        {/* Hover Tooltip */}
        {hoveredCell && (
          <div className="fixed z-50 pointer-events-none bg-white dark:bg-[#1A1D18] rounded-lg shadow-dropdown px-3 py-2 border border-light-gray dark:border-white/10"
               style={{
                 left: '50%',
                 top: '50%',
                 transform: 'translate(-50%, -100%)',
               }}>
            <p className="text-xs font-semibold text-text-primary dark:text-white">{hoveredCell.village}</p>
            <p className="text-[11px] text-text-muted">Risk: {hoveredCell.riskPercent}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
