'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { Quiz } from '@/lib/utils/mockQuizData';
import { cn } from '@/lib/utils/cn';
import { useGraphStore } from '@/store/useGraphStore';
import { useQuizStore } from '@/store/useQuizStore';

const spring = { type: 'spring', stiffness: 300, damping: 30 } as const;

interface QuizWorkspaceProps {
  quiz: Quiz;
}

export function QuizWorkspace({ quiz }: QuizWorkspaceProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const score = useQuizStore((state) => state.score);
  const mistakes = useQuizStore((state) => state.mistakes);
  const quizStatus = useQuizStore((state) => state.quizStatus);
  const setActiveQuizId = useQuizStore((state) => state.setActiveQuizId);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);
  const completeQuiz = useQuizStore((state) => state.completeQuiz);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const updateNodeMastery = useGraphStore((state) => state.updateNodeMastery);

  useEffect(() => {
    setActiveQuizId(quiz.id);
    resetQuiz();
    return () => setActiveQuizId(null);
  }, [quiz.id, resetQuiz, setActiveQuizId]);

  const question = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const completionRatio = totalQuestions > 0 ? currentQuestionIndex / totalQuestions : 0;
  const finalRatio = totalQuestions > 0 ? score / totalQuestions : 0;

  useEffect(() => {
    if (quizStatus === 'passed') {
      updateNodeMastery('psychology-behavioral', 100);
    }
  }, [quizStatus, updateNodeMastery]);

  const handleOptionClick = (option: string) => {
    if (!question || isAnswered) return;

    const correct = option === question.correctAnswer;
    setSelectedOption(option);
    setIsAnswered(true);
    answerQuestion(correct, question.id);

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex >= totalQuestions) {
        completeQuiz();
      }
      setSelectedOption(null);
      setIsAnswered(false);
    }, 700);
  };

  const answeredCorrect = selectedOption != null && question ? selectedOption === question.correctAnswer : false;

  const resultTitle = useMemo(() => {
    if (quizStatus === 'passed') return 'Mission Accomplished. Node Mastered.';
    if (quizStatus === 'failed') return 'Mission Failed. Node at risk.';
    return '';
  }, [quizStatus]);

  if (quizStatus === 'passed' || quizStatus === 'failed') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-2xl"
      >
        {quizStatus === 'passed' ? (
          <CheckCircle2 size={42} className="text-emerald-300" />
        ) : (
          <ShieldAlert size={42} className="text-rose-300" />
        )}

        <h1 className="mt-5 text-4xl font-light text-white">{resultTitle}</h1>
        <p className="mt-3 text-sm text-slate-300">
          {quizStatus === 'passed'
            ? 'Your Behavioral node has reached full mastery and now emits premium glow in the Knowledge Web.'
            : 'Mistakes were added to backlog. Clear them quickly to prevent Lights Off degradation.'}
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80">
          Score: {score}/{totalQuestions} ({Math.round(finalRatio * 100)}%)
        </div>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex h-12 items-center rounded-2xl border border-white/15 bg-white/[0.08] px-5 text-sm text-white transition hover:bg-white/[0.14]"
        >
          Return to Dashboard
        </Link>
      </motion.section>
    );
  }

  if (!question) return null;

  return (
    <section className="mx-auto flex h-full w-full max-w-4xl flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl lg:p-8">
      <header className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.22em] text-white/55">The Gauntlet</p>
        <p className="text-xs text-white/70">
          Question {Math.min(currentQuestionIndex + 1, totalQuestions)} of {totalQuestions}
        </p>
      </header>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-300/80 via-sky-300/80 to-emerald-300/85"
          animate={{ width: `${completionRatio * 100}%` }}
          transition={spring}
        />
      </div>

      <article className="rounded-3xl border border-white/10 bg-black/20 p-7">
        <h2 className="text-2xl font-light leading-relaxed text-white">{question.text}</h2>
      </article>

      <div className="grid gap-3">
        {question.options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrectOption = option === question.correctAnswer;

          return (
            <motion.button
              key={option}
              type="button"
              whileTap={{ scale: 0.985 }}
              transition={spring}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              className={cn(
                'w-full rounded-2xl border bg-white/[0.05] px-4 py-3 text-left text-sm text-white/90 transition',
                'border-white/10 hover:border-white/20 hover:bg-white/[0.08]',
                isSelected && answeredCorrect && 'border-emerald-300/60 bg-emerald-300/15 shadow-[0_0_0_1px_rgba(110,231,183,0.25)]',
                isSelected && !answeredCorrect && 'border-rose-300/50 bg-rose-300/12 shadow-[0_0_0_1px_rgba(253,164,175,0.2)]',
                isAnswered && !isSelected && isCorrectOption && 'border-emerald-300/40'
              )}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && !answeredCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={spring}
            className="rounded-2xl border border-rose-300/25 bg-rose-300/10 p-4"
          >
            <div className="inline-flex items-center gap-2 text-sm text-rose-100">
              <AlertTriangle size={16} />
              <span className="font-medium">Review Note</span>
            </div>
            <p className="mt-2 text-sm text-rose-50/90">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-auto text-xs text-white/55">
        Mistakes captured: <span className="text-white/80">{mistakes.length}</span>
      </footer>
    </section>
  );
}
