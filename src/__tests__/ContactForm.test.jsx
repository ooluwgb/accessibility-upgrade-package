import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import ContactForm from '../pages/ContactForm';

function renderForm() {
  return render(
    <MemoryRouter>
      <ContactForm />
    </MemoryRouter>
  );
}

describe('ContactForm', () => {
  it('has no axe violations on initial render', async () => {
    const { container } = renderForm();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('associates labels with controls via htmlFor/id', () => {
    renderForm();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('sets autocomplete on the name and email fields (WCAG 1.3.5)', () => {
    renderForm();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute(
      'autocomplete',
      'name'
    );
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute(
      'autocomplete',
      'email'
    );
  });

  it('renders an error summary and marks fields invalid when submitted empty', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: /submit message/i }));

    // Error summary appears and is focused.
    const summary = await screen.findByRole('alert');
    expect(summary).toHaveAccessibleName(/problems with your submission/i);
    await waitFor(() => expect(summary).toHaveFocus());

    // Each invalid field is marked aria-invalid.
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('still has no axe violations after displaying errors', async () => {
    const user = userEvent.setup();
    const { container } = renderForm();
    await user.click(screen.getByRole('button', { name: /submit message/i }));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
