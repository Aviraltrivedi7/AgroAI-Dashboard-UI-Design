import { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF, InfoWindowF } from '@react-google-maps/api';

const center = { lat: 21.125, lng: 79.5 };

const stops = [
  { id: 1, lat: 21.0, lng: 78.5, num: 1, name: 'Retailer R12' },
  { id: 2, lat: 21.5, lng: 79.2, num: 2, name: 'Village A' },
  { id: 3, lat: 20.8, lng: 79.8, num: 3, name: 'Cluster B' },
  { id: 4, lat: 21.2, lng: 80.5, num: 4, name: 'Retailer R08' },
];

const polylineOptions = {
  strokeColor: '#34C759', // lime-green
  strokeOpacity: 0.8,
  strokeWeight: 4,
};

const getMarkerIcon = () => {
  return {
    path: typeof window !== 'undefined' && window.google ? google.maps.SymbolPath.CIRCLE : 0,
    fillColor: '#1B5E20', // deep-green
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: '#ffffff',
    scale: 10,
  };
};

export function RouteVisualization() {
  const [activeStop, setActiveStop] = useState<number | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBV24loDaI5LfA3rTTXDMS-fvRCxfgkqnc',
  });

  const path = useMemo(() => stops.map(stop => ({ lat: stop.lat, lng: stop.lng })), []);

  return (
    <div className="bg-white dark:bg-white/5 rounded-card shadow-card border border-transparent dark:border-white/5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-light-gray dark:border-white/10">
        <h4 className="font-semibold text-text-primary dark:text-white">Optimized Route</h4>
        <span className="text-xs text-text-muted">4 stops | 28km | 3.5hrs</span>
      </div>

      {/* Map */}
      <div className="relative h-[300px] bg-light-gray dark:bg-white/5 m-4 rounded-xl overflow-hidden z-0">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={7}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            <PolylineF path={path} options={polylineOptions} />

            {stops.map((stop) => (
              <MarkerF
                key={stop.id}
                position={{ lat: stop.lat, lng: stop.lng }}
                icon={getMarkerIcon()}
                label={{ text: stop.num.toString(), color: 'white', fontSize: '10px', fontWeight: 'bold' }}
                onClick={() => setActiveStop(stop.id)}
              >
                {activeStop === stop.id && (
                  <InfoWindowF
                    position={{ lat: stop.lat, lng: stop.lng }}
                    onCloseClick={() => setActiveStop(null)}
                    options={{ pixelOffset: new window.google.maps.Size(0, -10) }}
                  >
                    <div className="text-xs font-medium text-gray-900 p-1">
                      {stop.name}
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            ))}
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-text-muted animate-pulse">Loading route...</span>
          </div>
        )}

        {/* Recalculate Button */}
        <button className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-button bg-white dark:bg-[#1A1D18] shadow-dropdown text-sm font-medium text-text-primary dark:text-white hover:bg-light-gray transition-colors z-10">
          <RefreshCw className="w-4 h-4" />
          Recalculate
        </button>
      </div>
    </div>
  );
}
