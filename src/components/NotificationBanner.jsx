import React from 'react';

/**
 * Status / alert banner (WCAG 4.1.3 Status Messages).
 *
 * Fixes vs. baseline:
 *  - The baseline combined `role="alert"` (implies aria-live="assertive")
 *    with `aria-live="polite"` on the same element, which is contradictory.
 *  - Now: error banners use `role="alert"` alone; info/success/warning
 *    banners use `role="status"` + `aria-live="polite"`.
 *  - Dismiss button has a real accessible label and focus-visible ring.
 *  - Color pairs chosen to exceed 4.5:1 on the banner background.
 */
const VARIANT_META = {
  info:    { role: 'status', live: 'polite'    },
  success: { role: 'status', live: 'polite'    },
  warning: { role: 'status', live: 'polite'    },
  error:   { role: 'alert',  live: undefined   },
};

export default function NotificationBanner({
  type = 'info',
  message,
  onDismiss,
  id,
}) {
  const meta = VARIANT_META[type] || VARIANT_META.info;

  return (
    <div
      id={id}
      role={meta.role}
      aria-live={meta.live}
      aria-atomic="true"
      className={`banner banner--${type}`}
      tabIndex={-1}
    >
      <p className="banner__message">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="banner__dismiss"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
}
