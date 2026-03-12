'use client';

import dynamic from 'next/dynamic';
import { Orbit } from 'lucide-react';

const GraphScene = dynamic(() => import('@/components/webgl/GraphScene').then((mod) => mod.GraphScene), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75">
        <Orbit className="animate-spin" size={16} />
        Loading Knowledge Web...
      </div>
    </div>
  )
});

export function KnowledgeGraphWrapper() {
  return <GraphScene />;
}
