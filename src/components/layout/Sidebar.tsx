'use client';

import { motion } from 'framer-motion';
import { BookOpen, Grid3X3, PanelLeftClose, PanelLeftOpen, Sparkles, Waypoints } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import type { AppMode } from '@/store/useUIStore';
import { useUIStore } from '@/store/useUIStore';

const navItems: Array<{ label: string; mode: AppMode; href: string; icon: typeof Grid3X3 }> = [
  { label: 'Dashboard', mode: 'dashboard', href: '/dashboard', icon: Grid3X3 },
  { label: 'Knowledge Web', mode: 'graph', href: '/graph', icon: Waypoints },
  { label: 'Lessons', mode: 'lesson', href: '/lesson/intro', icon: BookOpen },
  { label: 'Backlog', mode: 'quiz', href: '/quiz/backlog', icon: Sparkles }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const setActiveMode = useUIStore((state) => state.setActiveMode);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 248 : 84 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden h-[calc(100vh-2rem)] shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-2xl lg:flex"
    >
      <div className="mb-6 flex items-center justify-between px-2 pt-2">
        <div className={cn('overflow-hidden transition-all', isSidebarOpen ? 'w-32 opacity-100' : 'w-0 opacity-0')}>
          <p className="truncate text-xs uppercase tracking-[0.22em] text-white/55">Mission Expansion</p>
        </div>
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/70 transition hover:bg-white/[0.08] hover:text-white"
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setActiveMode(item.mode);
                router.push(item.href);
              }}
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition',
                isActive
                  ? 'border border-white/20 bg-white/[0.12] text-white'
                  : 'border border-transparent text-white/65 hover:border-white/10 hover:bg-white/[0.05] hover:text-white'
              )}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                <Icon size={16} />
              </span>
              <span className={cn('truncate transition-all', isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0')}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
}
