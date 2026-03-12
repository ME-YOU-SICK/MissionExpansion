'use client';

import { useEffect, useRef, useState } from 'react';
import ForceGraph3D, { type ForceGraphMethods, type LinkObject, type NodeObject } from 'react-force-graph-3d';
import * as THREE from 'three';
import { initialGraphData, type GraphLink, type GraphNode } from '@/lib/utils/mockGraphData';
import { useGraphStore } from '@/store/useGraphStore';

type SceneNode = NodeObject<GraphNode> & GraphNode;
type SceneLink = LinkObject<SceneNode, GraphLink> & GraphLink;

const GROUP_COLORS: Record<string, string> = {
  psychology: '#d946ef',
  coding: '#22c55e',
  science: '#38bdf8',
  math: '#f59e0b'
};

function mixMasteryColor(groupColor: string, mastery: number): THREE.Color {
  const base = new THREE.Color(groupColor);
  const white = new THREE.Color('#ffffff');
  return white.lerp(base, Math.min(Math.max(mastery / 100, 0), 1));
}

function isLinkConnectedToNode(link: SceneLink, nodeId: string | null): boolean {
  if (!nodeId) return false;
  const sourceId = typeof link.source === 'object' ? String(link.source.id) : String(link.source);
  const targetId = typeof link.target === 'object' ? String(link.target.id) : String(link.target);
  return sourceId === nodeId || targetId === nodeId;
}

export function GraphScene() {
  const graphRef = useRef<ForceGraphMethods<SceneNode, SceneLink>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 760 });

  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const hoveredNodeId = useGraphStore((state) => state.hoveredNodeId);
  const setHoveredNodeId = useGraphStore((state) => state.setHoveredNodeId);
  const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!graphRef.current) return;

    const renderer = graphRef.current.renderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    graphRef.current.d3Force('charge')?.strength(-180);
    graphRef.current.d3VelocityDecay(0.28);
    graphRef.current.d3AlphaDecay(0.03);
    graphRef.current.cameraPosition({ z: 360 });
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <ForceGraph3D
        ref={graphRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={initialGraphData}
        backgroundColor="rgba(0,0,0,0)"
        enableNodeDrag={false}
        showNavInfo={false}
        onNodeHover={(node) => setHoveredNodeId((node as SceneNode | null)?.id ?? null)}
        onNodeClick={(node) => setSelectedNodeId((node as SceneNode).id)}
        linkOpacity={0.14}
        linkWidth={(link) => (isLinkConnectedToNode(link as SceneLink, hoveredNodeId) ? 1.25 : 0.55)}
        linkColor={(link) => {
          const isConnected = isLinkConnectedToNode(link as SceneLink, hoveredNodeId);
          return isConnected ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.12)';
        }}
        nodeThreeObject={(node) => {
          const data = node as SceneNode;
          const mastery = data.mastery ?? 0;
          const radius = 4.4 + (mastery / 100) * 3.8;
          const color = mastery === 0 ? new THREE.Color('#cbd5e1') : mixMasteryColor(GROUP_COLORS[data.group] ?? '#64748b', mastery);

          const material = new THREE.MeshStandardMaterial({
            color,
            metalness: 0.18,
            roughness: 0.34,
            emissive: mastery >= 100 ? color.clone().multiplyScalar(0.45) : color.clone().multiplyScalar(0.05),
            emissiveIntensity: mastery >= 100 ? 1.6 : mastery > 0 ? 0.35 : 0.07,
            transparent: true,
            opacity: mastery === 0 ? 0.52 : 0.95
          });

          const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 28, 28), material);
          mesh.userData.baseScale = 1;
          mesh.userData.nodeId = data.id;
          mesh.userData.radius = radius;
          return mesh;
        }}
        nodeThreeObjectExtend={false}
        nodeThreeObjectUpdate={(object, node) => {
          const mesh = object as THREE.Mesh;
          const currentScale = mesh.scale.x;
          const id = (node as SceneNode).id;

          const isFocused = id === hoveredNodeId;
          const isSelected = id === selectedNodeId;
          const targetScale = isFocused ? 1.2 : isSelected ? 1.12 : 1;

          const nextScale = currentScale + (targetScale - currentScale) * 0.2;
          mesh.scale.setScalar(nextScale);
        }}
      />
    </div>
  );
}
