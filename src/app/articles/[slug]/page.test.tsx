import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ArticlePage, { generateStaticParams } from './page';

describe('ArticlePage', () => {
  it('renders a matching article detail page by slug', async () => {
    render(
      await ArticlePage({
        params: Promise.resolve({ slug: 'window-life-cycle' }),
      })
    );

    expect(
      screen.getByRole('heading', { name: 'Жизненный цикл окна', level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText('Октябрь 3, 2017')).toBeInTheDocument();
    expect(
      screen.getByText(/Жизненный цикл окна начинается не на производстве/i)
    ).toBeInTheDocument();
  });

  it('generates static routes for all article cards', () => {
    expect(generateStaticParams()).toEqual(
      expect.arrayContaining([
        { slug: 'window-life-cycle' },
        { slug: 'choose-aluminum-profile' },
        { slug: 'warm-aluminum-profile' },
      ])
    );
  });
});
