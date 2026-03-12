import { create } from 'zustand';
import { initialGraphData, type GraphData } from '@/lib/utils/mockGraphData';

interface GraphState {
  graphData: GraphData;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  setSelectedNodeId: (nodeId: string | null) => void;
  setHoveredNodeId: (nodeId: string | null) => void;
  updateNodeMastery: (nodeId: string, newMastery: number) => void;
  clearNodeFocus: () => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  graphData: initialGraphData,
  selectedNodeId: null,
  hoveredNodeId: null,
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
  setHoveredNodeId: (nodeId) => set({ hoveredNodeId: nodeId }),
  updateNodeMastery: (nodeId, newMastery) =>
    set((state) => ({
      graphData: {
        ...state.graphData,
        nodes: state.graphData.nodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                mastery: Math.max(0, Math.min(100, newMastery))
              }
            : node
        )
      }
    })),
  clearNodeFocus: () => set({ selectedNodeId: null, hoveredNodeId: null })
}));
