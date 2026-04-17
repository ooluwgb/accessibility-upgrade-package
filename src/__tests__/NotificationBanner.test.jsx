import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import NotificationBanner from '../components/NotificationBanner';

describe('NotificationBanner', () => {
  it('renders info banners with role=status and aria-live=polite', () => {
    render(<NotificationBanner type="info" message="Hello" />);
    const banner = screen.getByRole('status');
    expect(banner).toHaveAttribute('aria-live', 'polite');
  });

  it('renders error banners with role=alert and no aria-live override', () => {
    render(<NotificationBanner type="error" message="Something broke" />);
    const banner = screen.getByRole('alert');
    expect(banner).not.toHaveAttribute('aria-live');
  });

  it('has no axe violations across variants', async () => {
    const { container } = render(
      <div>
        <NotificationBanner type="info"    message="Info"    />
        <NotificationBanner type="success" message="Saved"   />
        <NotificationBanner type="warning" message="Careful" />
        <NotificationBanner type="error"   message="Failure" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
