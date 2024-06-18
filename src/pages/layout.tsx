import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lingua Evo',
  description: 'Lingua Evo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx('bg-slate-100 min-h-screen', inter.className)}>
        {children}
      </body>
    </html>
  );
}
