import { create } from 'zustand';

export type QuizStatus = 'idle' | 'in-progress' | 'passed' | 'failed';

interface QuizState {
  activeQuizId: string | null;
  currentQuestionIndex: number;
  score: number;
  mistakes: string[];
  quizStatus: QuizStatus;
  setActiveQuizId: (quizId: string | null) => void;
  answerQuestion: (isCorrect: boolean, questionId: string) => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  activeQuizId: null,
  currentQuestionIndex: 0,
  score: 0,
  mistakes: [],
  quizStatus: 'idle',
  setActiveQuizId: (quizId) =>
    set({
      activeQuizId: quizId,
      currentQuestionIndex: 0,
      score: 0,
      mistakes: [],
      quizStatus: quizId ? 'in-progress' : 'idle'
    }),
  answerQuestion: (isCorrect, questionId) =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      score: isCorrect ? state.score + 1 : state.score,
      mistakes: isCorrect ? state.mistakes : [...state.mistakes, questionId]
    })),
  resetQuiz: () =>
    set((state) => ({
      currentQuestionIndex: 0,
      score: 0,
      mistakes: [],
      quizStatus: state.activeQuizId ? 'in-progress' : 'idle'
    })),
  completeQuiz: () =>
    set((state) => ({
      quizStatus: state.score / Math.max(state.currentQuestionIndex, 1) > 0.5 ? 'passed' : 'failed'
    }))
}));
