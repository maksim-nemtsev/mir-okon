import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SignUpPage from './page';

vi.mock('@clerk/nextjs', () => ({
  SignUp: () => <div>Clerk sign up</div>,
}));

describe('SignUpPage', () => {
  it('renders a fallback when Clerk is not configured', () => {
    render(<SignUpPage />);

    expect(
      screen.getByRole('heading', { name: 'Authentication is not configured' })
    ).toBeInTheDocument();
  });
});
