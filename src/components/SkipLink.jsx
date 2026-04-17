import React from 'react';

/**
 * Skip link (WCAG 2.4.1 Bypass Blocks).
 *
 * Uses a transform-based slide-in pattern instead of `left: -9999px` so
 * screen readers still see it in the normal reading order, and it becomes
 * visible on keyboard focus.
 */
export default function SkipLink() {
  return (
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>
  );
}
