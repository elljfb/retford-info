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
    if (!mapRef.current || mapInstanceRef.current) return;

    // Geocode the address to get coordinates
    const geocodeAddress = async () => {
      try {
        // Using Nominatim (OpenStreetMap's geocoding service)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address + ', Retford, Nottinghamshire, UK'
          )}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          
          // Create map
          const map = L.map(mapRef.current!).setView([parseFloat(lat), parseFloat(lon)], 15);
          mapInstanceRef.current = map;

          // Add OpenStreetMap tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map);

          // Add marker
          L.marker([parseFloat(lat), parseFloat(lon)])
            .addTo(map)
            .bindPopup(`<b>${businessName}</b><br>${address}`)
            .openPopup();
        } else {
          // Fallback to Retford center if address not found
          const map = L.map(mapRef.current!).setView([53.3225, -0.9417], 13);
          mapInstanceRef.current = map;

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map);
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
        
        // Fallback to Retford center
        if (mapRef.current) {
          const map = L.map(mapRef.current).setView([53.3225, -0.9417], 13);
          mapInstanceRef.current = map;

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map);
        }
      }
    };

    geocodeAddress();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [address, businessName]);

  return <div ref={mapRef} className={className} style={{ height: '100%', minHeight: '200px' }} />;
}
