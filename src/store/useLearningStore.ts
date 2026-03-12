import { create } from 'zustand';

export type LearningStage = 'vocab' | 'concept' | 'complete';

interface LearningState {
  activeLessonId: string | null;
  progressPercentage: number;
  currentStage: LearningStage;
  setActiveLessonId: (lessonId: string | null) => void;
  setProgress: (value: number) => void;
  setStage: (stage: LearningStage) => void;
  completeLesson: () => void;
}

export const useLearningStore = create<LearningState>((set) => ({
  activeLessonId: null,
  progressPercentage: 0,
  currentStage: 'vocab',
  setActiveLessonId: (lessonId) => set({ activeLessonId: lessonId }),
  setProgress: (value) =>
    set({
      progressPercentage: Math.max(0, Math.min(100, value))
    }),
  setStage: (stage) => set({ currentStage: stage }),
  completeLesson: () => set({ progressPercentage: 100, currentStage: 'complete' })
}));
