import React, { useEffect, useRef } from 'react';
import { Activity } from '../types';
import L from 'leaflet';

// Fix for default Leaflet markers in React
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

interface MapProps {
  activities: Activity[];
  userLocation: { lat: number, lng: number } | null;
  focusedLocation: { lat: number, lng: number } | null;
}

const MapComponent: React.FC<MapProps> = ({ activities, userLocation, focusedLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Flåm by default
    const map = L.map(mapContainerRef.current).setView([60.8638, 7.1187], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers and Routes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers/lines
    layersRef.current.forEach(layer => layer.remove());
    layersRef.current = [];

    const defaultIcon = L.icon({
      iconUrl,
      iconRetinaUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    const endIcon = L.divIcon({
      className: 'end-marker',
      html: '<div style="background-color: #3A7D44; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>',
      iconSize: [12, 12]
    });

    // Activity Markers & Polylines
    activities.forEach(act => {
      // Start Marker
      const marker = L.marker([act.coords.lat, act.coords.lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(`<b>${act.title}</b><br/>Inicio: ${act.locationName}`);
      layersRef.current.push(marker);

      // If there is a destination/end point
      if (act.endCoords) {
        // End Marker (Different style)
        const destMarker = L.marker([act.endCoords.lat, act.endCoords.lng], { icon: endIcon })
          .addTo(map)
          .bindPopup(`<b>${act.title}</b><br/>Fin: ${act.endLocationName}`);
        layersRef.current.push(destMarker);

        // Polyline (Route)
        const latlngs: [number, number][] = [
            [act.coords.lat, act.coords.lng], 
            [act.endCoords.lat, act.endCoords.lng]
        ];
        
        const polyline = L.polyline(latlngs, { 
            color: '#2A5B87', 
            weight: 3, 
            opacity: 0.7, 
            dashArray: '5, 10' 
        }).addTo(map);
        layersRef.current.push(polyline);
      }
    });

    // User Location Marker (Blue Circle)
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-marker',
        html: '<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
        iconSize: [16, 16]
      });
      const marker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup("Estás aquí");
      layersRef.current.push(marker);
    }
  }, [activities, userLocation]);

  // Focus Logic
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !focusedLocation) return;

    map.flyTo([focusedLocation.lat, focusedLocation.lng], 14, {
      duration: 1.5
    });
  }, [focusedLocation]);

  return <div ref={mapContainerRef} className="w-full h-full z-0" />;
};

export default MapComponent;