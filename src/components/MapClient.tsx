'use client';

import dynamic from 'next/dynamic';

import type { ComponentProps } from 'react';
import type MapComponent from './Map';

type MapProps = ComponentProps<typeof MapComponent>;

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 h-full min-h-48 rounded-lg flex items-center justify-center text-gray-600">
      Loading map...
    </div>
  ),
});

export default function MapClient(props: MapProps) {
  return <Map {...props} />;
}
