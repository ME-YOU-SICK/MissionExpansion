import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { AppProviders } from '@/providers/app-providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Mission Expansion',
  description: 'Premium learning and knowledge web platform.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} min-h-screen`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
