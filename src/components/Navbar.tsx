'use client';

import { Github, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-(--background)/85 backdrop-blur-lg border-b border-(--border) shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 max-w-full">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-bold font-poppins bg-linear-to-r from-(--primary) to-(--accent) bg-clip-text text-transparent">
            NextBoiler
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="https://github.com/AnwarHossainSR/nextjs-16-template"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-(--foreground) hover:text-(--primary) transition-colors duration-200"
          >
            <Github className="h-5 w-5" />
          </Link>
          <ThemeToggle />
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={handleToggle}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-16 z-50 bg-(--background) border-b border-(--border) shadow-lg md:hidden animate-in slide-in-from-top duration-300 max-w-full">
            <div className="container py-6 flex flex-col space-y-4 px-4 sm:px-6 max-w-full">
              <div className="flex items-center justify-between">
                <Link
                  href="https://github.com/AnwarHossainSR/nextjs-16-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-(--foreground) hover:text-(--primary) transition-colors duration-200"
                  onClick={handleToggle}
                >
                  <Github className="h-5 w-5" />
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
