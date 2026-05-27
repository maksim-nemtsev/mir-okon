import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductsPage from './page';

describe('ProductsPage', () => {
  it('renders product catalog cards', () => {
    render(<ProductsPage />);

    expect(
      screen.getByRole('heading', {
        name: 'Фурнитура Roto для алюминиевых систем',
        level: 1,
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Roto AL 300')).toBeInTheDocument();
    expect(
      screen
        .getAllByRole('link', { name: /Узнать больше/i })
        .map((link) => link.getAttribute('href'))
    ).toEqual(
      expect.arrayContaining([
        '/products/roto-al-300',
        '/products/roto-al-designo',
        '/products/roto-patio-alversa',
        '/products/roto-patio-fold',
      ])
    );
    expect(
      screen.getAllByRole('link', { name: /Получить расчет/i })
    ).toHaveLength(4);
  });
});
