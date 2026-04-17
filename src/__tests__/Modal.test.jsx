import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Modal from '../components/Modal';

function ModalHarness() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm action">
        <p>Are you sure?</p>
        <button type="button">Confirm</button>
      </Modal>
    </div>
  );
}

describe('Modal', () => {
  it('has no axe violations when closed', async () => {
    const { container } = render(<ModalHarness />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no axe violations when open', async () => {
    const user = userEvent.setup();
    const { container } = render(<ModalHarness />);
    await user.click(screen.getByRole('button', { name: /open dialog/i }));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('moves focus to the close button on open', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);
    await user.click(screen.getByRole('button', { name: /open dialog/i }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /close dialog/i })).toHaveFocus()
    );
  });

  it('closes on Escape and restores focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    const trigger = screen.getByRole('button', { name: /open dialog/i });
    await user.click(trigger);

    await user.keyboard('{Escape}');

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(trigger).toHaveFocus();
  });

  it('exposes dialog semantics with an accessible name', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);
    await user.click(screen.getByRole('button', { name: /open dialog/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName('Confirm action');
  });
});
