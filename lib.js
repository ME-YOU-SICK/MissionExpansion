export const curriculum = [
  {
    id: 'logic', name: 'Formal Logic', x: 120, y: 220, progress: 0, status: 'locked',
    vocabulary: ['proposition', 'inference', 'validity', 'syllogism'],
    concepts: ['Validity means conclusions necessarily follow from premises.'],
    questions: [{ id: 'logic-1', prompt: 'A valid argument guarantees what?', choices: ['True premises', 'True conclusion if premises are true', 'No contradictions', 'Simple language'], answer: 1 }]
  },
  {
    id: 'stats', name: 'Statistics', x: 300, y: 180, progress: 24, status: 'learning',
    vocabulary: ['population', 'sample', 'variance', 'bias'],
    concepts: ['Sampling bias distorts estimates away from the true population value.'],
    questions: [{ id: 'stats-1', prompt: 'Which metric quantifies spread?', choices: ['Mean', 'Median', 'Variance', 'Mode'], answer: 2 }]
  },
  {
    id: 'algorithms', name: 'Algorithms', x: 480, y: 300, progress: 72, status: 'learning',
    vocabulary: ['complexity', 'greedy', 'dynamic programming', 'graph'],
    concepts: ['Big-O upper bounds growth of runtime as input increases.'],
    questions: [{ id: 'algo-1', prompt: 'What does O(n log n) describe?', choices: ['Memory usage only', 'Asymptotic runtime growth', 'Bug count', 'Instruction set size'], answer: 1 }]
  },
  {
    id: 'ethics', name: 'Ethics', x: 680, y: 200, progress: 100, status: 'mastered',
    vocabulary: ['deontology', 'consequentialism', 'virtue', 'duty'],
    concepts: ['Consequentialism evaluates actions by outcomes.'],
    questions: [{ id: 'ethics-1', prompt: 'Which view judges actions by outcomes?', choices: ['Deontology', 'Consequentialism', 'Stoicism', 'Skepticism'], answer: 1 }]
  },
  {
    id: 'cognitive', name: 'Cognitive Psychology', x: 860, y: 320, progress: 48, status: 'fading', dueReviewAt: new Date(Date.now() + 36 * 3600 * 1000).toISOString(),
    vocabulary: ['schema', 'attention', 'memory encoding', 'bias'],
    concepts: ['Working memory is limited and benefits from chunking.'],
    questions: [{ id: 'cog-1', prompt: 'Which strategy helps working memory?', choices: ['Multitasking', 'Chunking', 'Ignoring context', 'Random rehearsal'], answer: 1 }]
  }
];

export const links = [['logic', 'stats'], ['logic', 'ethics'], ['stats', 'algorithms'], ['algorithms', 'cognitive'], ['ethics', 'cognitive']];

const multipliers = [1, 2, 6, 18, 48, 120];

export function nextIntervalHours(attempts, wasCorrect) {
  if (!wasCorrect) return 6;
  return multipliers[Math.min(attempts, multipliers.length - 1)];
}

export function scheduleReview(from, attempts, wasCorrect) {
  return new Date(from.getTime() + nextIntervalHours(attempts, wasCorrect) * 3600000);
}

export function nodeShouldFade(dueReviewAtIso, now = new Date()) {
  return now > new Date(dueReviewAtIso);
}

export function hoursUntilFade(dueReviewAtIso, now = new Date()) {
  const delta = Math.floor((new Date(dueReviewAtIso).getTime() - now.getTime()) / 3600000);
  return Math.max(0, delta);
}
