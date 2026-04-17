import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import NavBar from '../components/NavBar';

function renderNav(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <NavBar />
    </MemoryRouter>
  );
}

describe('NavBar', () => {
  it('has no axe violations', async () => {
    const { container } = renderNav();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('exposes a navigation landmark with an accessible name', () => {
    renderNav();
    expect(
      screen.getByRole('navigation', { name: /main navigation/i })
    ).toBeInTheDocument();
  });

  it('sets aria-current on the active route', () => {
    renderNav('/contact');
    const active = screen.getByRole('link', { name: /contact us/i });
    expect(active).toHaveAttribute('aria-current', 'page');

    const inactive = screen.getByRole('link', { name: /^home$/i });
    expect(inactive).not.toHaveAttribute('aria-current');
  });

  it('toggle button truthfully reflects expanded state', async () => {
    const user = userEvent.setup();
    renderNav();

    const toggle = screen.getByRole('button', {
      name: /open navigation menu/i,
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);

    expect(
      screen.getByRole('button', { name: /close navigation menu/i })
    ).toHaveAttribute('aria-expanded', 'true');
  });
});
