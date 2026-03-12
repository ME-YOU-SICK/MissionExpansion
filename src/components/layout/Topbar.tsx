'use client';

import { AudioLines, AudioWaveform, Flame, UserCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUIStore } from '@/store/useUIStore';

export function Topbar() {
  const isAudioEnabled = useUIStore((state) => state.isAudioEnabled);
  const toggleAudio = useUIStore((state) => state.toggleAudio);

  return (
    <header className="sticky top-4 z-30 flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 backdrop-blur-xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1.5 text-xs font-medium text-orange-200">
        <Flame size={14} />
        7 day streak
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleAudio}
          className={cn(
            'inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-sm transition',
            isAudioEnabled
              ? 'border-emerald-300/30 bg-emerald-300/12 text-emerald-100'
              : 'border-white/10 bg-white/[0.03] text-white/70 hover:text-white'
          )}
          aria-pressed={isAudioEnabled}
        >
          {isAudioEnabled ? <AudioWaveform size={16} /> : <AudioLines size={16} />}
          <span className="hidden sm:inline">Audio {isAudioEnabled ? 'On' : 'Off'}</span>
        </button>

        <div className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white/80">
          <UserCircle2 size={16} />
          <span className="hidden sm:inline">Profile</span>
        </div>
      </div>
    </header>
  );
}
