import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';

type MapTab = 'risk' | 'visits' | 'retailers';

const tabs: { id: MapTab; label: string }[] = [
  { id: 'risk', label: 'Risk' },
  { id: 'visits', label: 'Visits' },
  { id: 'retailers', label: 'Retailers' },
];

const center = { lat: 21.1458, lng: 79.0882 }; // Nagpur, Center of India

const mapDots = [
  { id: 1, lat: 22.1, lng: 78.5, type: 'risk' as const, label: 'Rampur' },
  { id: 2, lat: 20.5, lng: 79.8, type: 'risk' as const, label: 'Dharnai' },
  { id: 3, lat: 21.8, lng: 80.5, type: 'visits' as const, label: 'Sonepur' },
  { id: 4, lat: 19.5, lng: 77.5, type: 'visits' as const, label: 'Cluster B' },
  { id: 5, lat: 20.0, lng: 79.0, type: 'retailers' as const, label: 'R12 Store' },
  { id: 6, lat: 22.5, lng: 77.0, type: 'retailers' as const, label: 'R08 Kendra' },
  { id: 7, lat: 20.8, lng: 81.0, type: 'risk' as const, label: 'High Risk Zone' },
  { id: 8, lat: 21.5, lng: 78.8, type: 'visits' as const, label: 'Priority' },
];

const getMarkerIcon = (type: MapTab) => {
  // Use simple colored circles matching the previous design
  let color = '#FF3B30'; // danger-red
  if (type === 'visits') color = '#007AFF'; // info-blue
  else if (type === 'retailers') color = '#34C759'; // lime-green

  return {
    path: typeof window !== 'undefined' && window.google ? google.maps.SymbolPath.CIRCLE : 0,
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: '#ffffff',
    scale: 8,
  };
};

export function MapWidget() {
  const [activeTab, setActiveTab] = useState<MapTab>('risk');
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBV24loDaI5LfA3rTTXDMS-fvRCxfgkqnc',
  });

  const filteredDots = useMemo(() => {
    return mapDots; // Can filter by activeTab if needed, but currently shows all to match previous mock behavior
  }, []);

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
      <div className="relative flex-1 min-h-[300px] bg-light-gray dark:bg-white/5 m-4 rounded-xl overflow-hidden z-0">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={6}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              mapId: 'DEMO_MAP_ID', // Optional: for advanced styling if configured
            }}
          >
            {filteredDots.map((dot) => (
              <MarkerF
                key={dot.id}
                position={{ lat: dot.lat, lng: dot.lng }}
                icon={getMarkerIcon(dot.type)}
                onClick={() => setActiveMarker(dot.id)}
                animation={
                  typeof window !== 'undefined' && window.google && dot.type === activeTab
                    ? google.maps.Animation.BOUNCE
                    : undefined
                }
              >
                {activeMarker === dot.id && (
                  <InfoWindowF
                    position={{ lat: dot.lat, lng: dot.lng }}
                    onCloseClick={() => setActiveMarker(null)}
                    options={{ pixelOffset: new window.google.maps.Size(0, -10) }}
                  >
                    <div className="text-xs font-medium text-gray-900 p-1">
                      {dot.label}
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            ))}
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-text-muted animate-pulse">Loading map...</span>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-4 px-4 py-2 rounded-full bg-white/90 dark:bg-[#1A1D18]/90 backdrop-blur-sm shadow-sm z-10">
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
