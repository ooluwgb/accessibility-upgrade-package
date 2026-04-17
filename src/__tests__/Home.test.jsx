import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import Home from '../pages/Home';

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe('Home page', () => {
  it('has no axe violations', async () => {
    const { container } = renderHome();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has exactly one h1', () => {
    renderHome();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('exposes the search landmark with an accessible name', () => {
    renderHome();
    expect(
      screen.getByRole('search', { name: /search government services/i })
    ).toBeInTheDocument();
  });

  it('gives every service card a unique accessible link name', () => {
    renderHome();
    const links = screen.getAllByRole('link', { name: /learn more about/i });
    const names = links.map((el) => el.textContent);
    expect(new Set(names).size).toBe(names.length);
  });
});
