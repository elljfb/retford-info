'use client';

import dynamic from 'next/dynamic';

import type { ComponentProps } from 'react';
import type MultiMapComponent from './MultiMap';

type MultiMapProps = ComponentProps<typeof MultiMapComponent>;

const MultiMap = dynamic(() => import('@/components/MultiMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 h-full min-h-64 rounded-lg flex items-center justify-center text-gray-600">
      Loading map...
    </div>
  ),
});

export default function MultiMapClient(props: MultiMapProps) {
  return <MultiMap {...props} />;
}
