'use client';

import { AudioLines, AudioWaveform, Flame, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUIStore } from '@/store/useUIStore';

export function Topbar() {
  const isAudioEnabled = useUIStore((state) => state.isAudioEnabled);
  const toggleAudio = useUIStore((state) => state.toggleAudio);

  return (
    <Card className="sticky top-4 z-30 flex h-16 items-center justify-between bg-white/[0.03] px-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1.5 text-xs font-medium text-orange-200">
        <Flame size={14} />
        7 day streak
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" onClick={toggleAudio} variant={isAudioEnabled ? 'success' : 'ghost'} size="sm" aria-pressed={isAudioEnabled}>
          {isAudioEnabled ? <AudioWaveform size={16} /> : <AudioLines size={16} />}
          <span className="hidden sm:inline">Audio {isAudioEnabled ? 'On' : 'Off'}</span>
        </Button>

        <Button type="button" variant="ghost" size="sm" className="text-white/80">
          <UserCircle2 size={16} />
          <span className="hidden sm:inline">Profile</span>
        </Button>
      </div>
    </Card>
  );
}
