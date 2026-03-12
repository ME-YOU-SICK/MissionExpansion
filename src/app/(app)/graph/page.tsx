'use client';

import { KnowledgeGraphWrapper } from '@/components/features/knowledge-web/KnowledgeGraphWrapper';
import { useGraphStore } from '@/store/useGraphStore';

export default function GraphPage() {
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);

  return (
    <section className="relative h-[calc(100vh-9.5rem)] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/20">
      <KnowledgeGraphWrapper />

      <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-white/60">Knowledge Web</p>
        <p className="mt-2 text-sm text-white/90">
          {selectedNodeId ? `Selected: ${selectedNodeId}` : 'Select a node to view details'}
        </p>
      </div>
    </section>
  );
}
