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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-4 text-white lg:p-4">
      <div className="mx-auto flex max-w-[1600px] gap-4">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Topbar />
          <main className="min-h-[calc(100vh-7rem)] rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
