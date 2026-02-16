'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = mobileOpen ? '' : 'hidden';
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/books', label: 'Books' },
    { href: '/writing', label: 'Writing' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <div
          className="max-w-wide mx-auto px-6 flex items-center justify-between transition-all duration-300"
          style={{ height: scrolled ? 56 : 68 }}
        >
          <Link
            href="/"
            className={`font-special-elite text-[var(--color-heading-1)] no-underline border-none hover:text-[var(--color-heading-2)] transition-all duration-300 ${
              scrolled ? 'text-lg' : 'text-xl'
            }`}
            style={{ borderBottom: 'none' }}
          >
            Nostem Koempassu
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            {mounted && (
              <button
                className="theme-toggle"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19'}
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden bg-transparent border-none cursor-pointer w-10 h-10 relative z-[110] mobile-toggle`}
            onClick={toggleMobile}
            aria-label="Menu"
          >
            <span
              style={{
                transform: mobileOpen
                  ? 'rotate(45deg) translate(5px, 6px)'
                  : 'none',
              }}
            />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span
              style={{
                transform: mobileOpen
                  ? 'rotate(-45deg) translate(5px, -6px)'
                  : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[105] flex flex-col items-center justify-center gap-8"
            style={{ background: 'var(--color-bg)' }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.35 }}
              >
                <Link
                  href={link.href}
                  className={`nav-link font-special-elite text-2xl ${
                    isActive(link.href) ? 'active' : ''
                  }`}
                  onClick={() => {
                    setMobileOpen(false);
                    document.body.style.overflow = '';
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
              >
                <button
                  className="theme-toggle mt-4"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19'}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
