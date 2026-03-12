'use client';

import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isQuizMode = pathname.startsWith('/quiz');

  if (isQuizMode) {
    return <div className="min-h-screen bg-black p-4 text-white">{children}</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-4 text-white lg:p-4">
      <div className="pointer-events-none absolute -left-28 top-12 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-8 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-[1600px] gap-4">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Topbar />
          <main className="min-h-[calc(100vh-7rem)] rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
