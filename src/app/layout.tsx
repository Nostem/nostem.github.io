'use client';

import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nostem Koempassu</title>
        <meta
          name="description"
          content="Exploring personal sovereignty, consciousness, and analog living."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Paper grain overlay */}
          <div className="paper-grain" />
          <Navigation />
          <main className="relative z-[2]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
