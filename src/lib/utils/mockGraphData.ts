export type GraphNode = {
  id: string;
  label: string;
  group: string;
  mastery: number;
};

export type GraphLink = {
  source: string;
  target: string;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export const initialGraphData: GraphData = {
  nodes: [
    { id: 'Psychology', label: 'Psychology', group: 'psychology', mastery: 72 },
    { id: 'Behavioral', label: 'Behavioral', group: 'psychology', mastery: 38 },
    { id: 'Cognitive', label: 'Cognitive', group: 'psychology', mastery: 91 },
    { id: 'Neuroscience', label: 'Neuroscience', group: 'science', mastery: 10 },
    { id: 'Coding', label: 'Coding', group: 'coding', mastery: 53 },
    { id: 'Algorithms', label: 'Algorithms', group: 'coding', mastery: 24 },
    { id: 'Systems Design', label: 'Systems Design', group: 'coding', mastery: 0 },
    { id: 'Logic', label: 'Logic', group: 'math', mastery: 64 },
    { id: 'Statistics', label: 'Statistics', group: 'math', mastery: 48 }
  ],
  links: [
    { source: 'Psychology', target: 'Behavioral' },
    { source: 'Psychology', target: 'Cognitive' },
    { source: 'Psychology', target: 'Neuroscience' },
    { source: 'Coding', target: 'Algorithms' },
    { source: 'Coding', target: 'Systems Design' },
    { source: 'Algorithms', target: 'Logic' },
    { source: 'Logic', target: 'Statistics' },
    { source: 'Statistics', target: 'Cognitive' }
  ]
};
