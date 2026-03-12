import { create } from 'zustand';

export type AppMode = 'dashboard' | 'lesson' | 'graph' | 'quiz';

interface UIState {
  isSidebarOpen: boolean;
  activeMode: AppMode;
  isAudioEnabled: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  setActiveMode: (mode: AppMode) => void;
  setAudioEnabled: (enabled: boolean) => void;
  toggleAudio: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  activeMode: 'dashboard',
  isAudioEnabled: true,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActiveMode: (mode) => set({ activeMode: mode }),
  setAudioEnabled: (enabled) => set({ isAudioEnabled: enabled }),
  toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled }))
}));
