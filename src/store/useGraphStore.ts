import { create } from 'zustand';

interface GraphState {
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  setSelectedNodeId: (nodeId: string | null) => void;
  setHoveredNodeId: (nodeId: string | null) => void;
  clearNodeFocus: () => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  selectedNodeId: null,
  hoveredNodeId: null,
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
  setHoveredNodeId: (nodeId) => set({ hoveredNodeId: nodeId }),
  clearNodeFocus: () => set({ selectedNodeId: null, hoveredNodeId: null })
}));
