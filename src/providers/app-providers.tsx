'use client';

import type { PropsWithChildren } from 'react';

export function AppProviders({ children }: PropsWithChildren) {
  // Future: Theme provider, Zustand hydration, R3F Canvas/Scene provider boundaries.
  return <>{children}</>;
}
