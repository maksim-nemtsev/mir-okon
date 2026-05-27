import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SignInPage from './page';

vi.mock('@clerk/nextjs', () => ({
  SignIn: () => <div>Clerk sign in</div>,
}));

describe('SignInPage', () => {
  it('renders a fallback when Clerk is not configured', () => {
    render(<SignInPage />);

    expect(
      screen.getByRole('heading', { name: 'Authentication is not configured' })
    ).toBeInTheDocument();
  });
});
