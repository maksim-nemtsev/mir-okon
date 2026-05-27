import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DashboardPage from './page';

vi.mock('@clerk/nextjs', () => ({
  SignOutButton: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useUser: () => ({
    user: {
      firstName: 'Alex',
      emailAddresses: [{ emailAddress: 'alex@example.com' }],
    },
  }),
}));

describe('DashboardPage', () => {
  it('renders a fallback when Clerk is not configured', () => {
    render(<DashboardPage />);

    expect(
      screen.getByRole('heading', { name: 'Authentication is not configured' })
    ).toBeInTheDocument();
    expect(screen.getByText(/enable the dashboard/i)).toBeInTheDocument();
  });
});
