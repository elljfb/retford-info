'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  name: string;
  address: string;
}

interface MultiMapProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export default function MultiMap({
  locations,
  center = [53.3225, -0.9417],
  zoom = 14,
  className = '',
}: MultiMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const container = mapRef.current;
    let cancelled = false;

    if (!container || mapInstanceRef.current) return;

    const initMap = async () => {
      if (cancelled || mapInstanceRef.current) return;

      const map = L.map(container).setView(center, zoom);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const bounds = L.latLngBounds([]);
      let hasValidLocations = false;

      for (const location of locations) {
        try {
          if (cancelled || !mapInstanceRef.current) return;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              `${location.address}, Retford, Nottinghamshire, UK`
            )}`
          );
          const data = await response.json();

          if (cancelled || !mapInstanceRef.current) return;

          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            const latLng = L.latLng(parseFloat(lat), parseFloat(lon));

            L.marker(latLng)
              .addTo(mapInstanceRef.current)
              .bindPopup(`<b>${location.name}</b><br>${location.address}`);

            bounds.extend(latLng);
            hasValidLocations = true;
          }

          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          if (!cancelled) {
            console.error(`Error geocoding ${location.name}:`, error);
          }
        }
      }

      if (!cancelled && mapInstanceRef.current && hasValidLocations && bounds.isValid()) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [100, 100], maxZoom: 14 });
      }
    };

    initMap();

    return () => {
      cancelled = true;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations, center, zoom]);

  return (
    <div
      ref={mapRef}
      className={className}
      style={{ height: '100%', minHeight: '400px', position: 'relative', zIndex: 1 }}
    />
  );
}
