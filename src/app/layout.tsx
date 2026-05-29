// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'Мир Окон',
  description:
    'Поставка фурнитуры для алюминиевых окон, дверей и светопрозрачных конструкций.',
  keywords: 'Мир Окон, алюминиевый профиль, фурнитура, окна, двери',
  authors: [{ name: 'Мир Окон' }],
  creator: 'Мир Окон',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://your-domain.com',
    title: 'Мир Окон',
    description:
      'Фурнитура для алюминиевых оконных, дверных и фасадных систем.',
    siteName: 'Мир Окон',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Мир Окон',
    description:
      'Фурнитура для алюминиевых оконных, дверных и фасадных систем.',
  },
};

function RootLayoutContent({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">{children}</main>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${inter.variable} font-sans antialiased overflow-x-hidden`}
      >
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
