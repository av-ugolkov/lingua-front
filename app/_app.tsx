import clsx from 'clsx';
import '/styles/global.css';
import { Inter } from 'next/font/google';

import { AppProps } from 'next/app';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={clsx('bg-slate-100 min-h-screen', inter.className)}>
      <Component {...pageProps} />
    </main>
  );
}
