'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, RotateCcw } from 'lucide-react';
import type { Lesson } from '@/lib/utils/mockLessonData';
import { cn } from '@/lib/utils/cn';
import { useLearningStore } from '@/store/useLearningStore';

const spring = { type: 'spring', stiffness: 300, damping: 30 } as const;

interface LessonWorkspaceProps {
  lesson: Lesson;
}

export function LessonWorkspace({ lesson }: LessonWorkspaceProps) {
  const [index, setIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const progressPercentage = useLearningStore((state) => state.progressPercentage);
  const currentStage = useLearningStore((state) => state.currentStage);
  const setActiveLessonId = useLearningStore((state) => state.setActiveLessonId);
  const setProgress = useLearningStore((state) => state.setProgress);
  const setStage = useLearningStore((state) => state.setStage);
  const completeLesson = useLearningStore((state) => state.completeLesson);

  useEffect(() => {
    setActiveLessonId(lesson.id);
    setStage('vocab');
    setProgress(0);

    return () => {
      setActiveLessonId(null);
      setStage('vocab');
      setProgress(0);
    };
  }, [lesson.id, setActiveLessonId, setProgress, setStage]);

  const currentTerm = lesson.vocabulary[index];

  const total = lesson.vocabulary.length;
  const isComplete = currentStage === 'complete' || index >= total;

  const progressLabel = useMemo(() => `${Math.round(progressPercentage)}%`, [progressPercentage]);

  const handleGotIt = () => {
    const nextIndex = Math.min(index + 1, total);
    const nextProgress = (nextIndex / total) * 100;
    setProgress(nextProgress);

    if (nextIndex >= total) {
      completeLesson();
      return;
    }

    setIndex(nextIndex);
    setShowDefinition(false);
  };

  const handleNeedReview = () => {
    setShowDefinition(true);
  };

  return (
    <section className="mx-auto flex h-full w-full max-w-4xl flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl lg:p-7">
      <header className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white/80 transition hover:bg-white/[0.08] hover:text-white"
        >
          <ArrowLeft size={16} />
          Exit
        </Link>

        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-fuchsia-300/80 via-sky-300/80 to-emerald-300/90"
            animate={{ width: `${progressPercentage}%` }}
            transition={spring}
          />
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/75">{progressLabel}</div>
      </header>

      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-white/50">{lesson.title}</p>
        <p className="mt-2 text-sm text-slate-300">{lesson.description}</p>
      </div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={`card-${currentTerm.term}-${showDefinition ? 'definition' : 'term'}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={spring}
            className="flex flex-1 flex-col"
          >
            <button
              type="button"
              onClick={() => setShowDefinition((prev) => !prev)}
              className="group relative flex min-h-[20rem] w-full flex-1 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 text-center"
            >
              <motion.div
                key={showDefinition ? 'definition' : 'term'}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={spring}
              >
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/50">
                  {showDefinition ? 'Definition' : 'Vocabulary'}
                </p>
                <p className={cn('mx-auto max-w-2xl', showDefinition ? 'text-2xl text-slate-200' : 'text-4xl font-semibold text-white')}>
                  {showDefinition ? currentTerm.definition : currentTerm.term}
                </p>
              </motion.div>
            </button>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleNeedReview}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] text-sm text-white/75 transition hover:bg-white/[0.08] hover:text-white"
              >
                <RotateCcw size={16} /> Need Review
              </button>

              <button
                type="button"
                onClick={handleGotIt}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-300/25 bg-emerald-300/12 text-sm text-emerald-100 transition hover:bg-emerald-300/20"
              >
                <Check size={16} /> Got it
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={spring}
            className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-emerald-300/25 bg-gradient-to-b from-emerald-300/15 to-white/[0.03] p-10 text-center"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-emerald-200/75">Mission Complete</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Vocabulary Mastered. Node actively saturating...</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              Your lexical fluency has been reinforced. Continue to the Knowledge Web to visualize progression and unlock the next conceptual lane.
            </p>
            <Link
              href="/graph"
              className="mt-8 inline-flex h-12 items-center rounded-2xl border border-white/15 bg-white/[0.08] px-5 text-sm text-white transition hover:bg-white/[0.14]"
            >
              Return to Web
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
