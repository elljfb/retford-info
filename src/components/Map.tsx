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

interface MapProps {
  address: string;
  businessName: string;
  className?: string;
}

export default function Map({ address, businessName, className = '' }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const container = mapRef.current;
    let cancelled = false;

    if (!container || mapInstanceRef.current) return;

    const createMap = (position: [number, number], zoom: number) => {
      if (cancelled || mapInstanceRef.current) return null;

      const map = L.map(container).setView(position, zoom);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      return map;
    };

    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            `${address}, Retford, Nottinghamshire, UK`
          )}`
        );
        const data = await response.json();

        if (cancelled || mapInstanceRef.current) return;

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const position: [number, number] = [parseFloat(lat), parseFloat(lon)];
          const map = createMap(position, 15);

          if (!map) return;

          L.marker(position)
            .addTo(map)
            .bindPopup(`<b>${businessName}</b><br>${address}`)
            .openPopup();
        } else {
          createMap([53.3225, -0.9417], 13);
        }
      } catch (error) {
        console.error('Error geocoding address:', error);

        if (!cancelled && !mapInstanceRef.current) {
          createMap([53.3225, -0.9417], 13);
        }
      }
    };

    geocodeAddress();

    return () => {
      cancelled = true;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [address, businessName]);

  return (
    <div
      ref={mapRef}
      className={className}
      style={{ height: '100%', minHeight: '200px', position: 'relative', zIndex: 1 }}
    />
  );
}
