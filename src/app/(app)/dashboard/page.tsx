'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Play } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLearningStore } from '@/store/useLearningStore';

const spring = { type: 'spring', stiffness: 300, damping: 30 } as const;

export default function DashboardPage() {
  const progressPercentage = useLearningStore((state) => state.progressPercentage);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <Card className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-white/55">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Mission Control</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Continue your active learning mission and maintain node saturation before retention windows expire.
        </p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <motion.article whileHover={{ y: -4, scale: 1.005 }} transition={spring}>
          <Card className="p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Continue Learning</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Behavioral Psychology</h2>
            <p className="mt-1 text-sm text-slate-300">Vocabulary lane active • psychology-behavioral</p>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                <span>Mission Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-fuchsia-300/80 via-sky-300/80 to-emerald-300/85"
                  animate={{ width: `${progressPercentage}%` }}
                  transition={spring}
                />
              </div>
            </div>

            <Button asChild className="mt-7">
              <Link href="/lesson/psychology-behavioral">
                <Play size={16} />
                Start Mission
              </Link>
            </Button>
          </Card>
        </motion.article>

        <Card className="border-amber-200/20 bg-amber-200/10 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-100/70">At Risk</p>
          <div className="mt-3 inline-flex items-center gap-2 text-amber-100">
            <AlertTriangle size={16} />
            <span className="text-sm">Cognitive node fading in 12h</span>
          </div>
          <p className="mt-3 text-xs text-amber-50/80">Clear backlog prompts to retain saturation and prevent lights-off decay.</p>
        </Card>
      </div>
    </section>
  );
}
