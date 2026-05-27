import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import MainNavbar from './Navbar';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

describe('MainNavbar', () => {
  it('renders the site brand and utility actions', () => {
    render(<MainNavbar />);

    expect(screen.getByRole('link', { name: 'NextBoiler' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/AnwarHossainSR/nextjs-16-template'
    );
    expect(
      screen.getByRole('button', { name: 'Toggle theme' })
    ).toBeInTheDocument();
  });
});
