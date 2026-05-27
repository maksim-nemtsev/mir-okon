import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductPage, { generateStaticParams } from './page';

describe('ProductPage', () => {
  it('renders a matching product detail page by slug', async () => {
    render(
      await ProductPage({
        params: Promise.resolve({ slug: 'roto-al-300' }),
      })
    );

    expect(
      screen.getByRole('heading', { name: 'Roto AL 300', level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Классическое решение для алюминиевых окон и дверей')
    ).toBeInTheDocument();
  });

  it('generates static routes for all product cards', () => {
    expect(generateStaticParams()).toEqual(
      expect.arrayContaining([
        { slug: 'roto-al-300' },
        { slug: 'roto-al-designo' },
        { slug: 'roto-patio-alversa' },
        { slug: 'roto-patio-fold' },
      ])
    );
  });
});
