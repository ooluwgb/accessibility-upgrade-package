import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import App from '../App';

describe('App', () => {
  it('renders without axe violations on the home route', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders without axe violations on the contact route', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('exposes exactly one <main> landmark and one <h1>', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(getAllByRole('main')).toHaveLength(1);
    expect(getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});
