import React, { useEffect, useId, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
  'audio[controls]',
  'video[controls]',
  'iframe',
  'details > summary:first-of-type',
].join(', ');

/**
 * Accessible modal dialog.
 *
 * Fixes vs. baseline:
 *  - Label association uses a per-instance useId() so two modals can coexist
 *    without duplicate IDs (WCAG 4.1.1 / robust markup).
 *  - The click-to-dismiss backdrop is a <button type="button"> with
 *    aria-label="Close dialog" rather than an aria-hidden clickable <div>.
 *    Axe flags `[aria-hidden] with interactive descendants`; this removes it.
 *  - Focusable-element selector excludes disabled elements and includes
 *    contenteditable, media controls, iframes, and <summary>.
 *  - On close, focus is restored to whatever triggered the modal (captured
 *    on open), satisfying WCAG 2.4.3 Focus Order expectations.
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    // Capture the element that had focus before the modal opened so we can
    // restore focus to it on close.
    triggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    closeButtonRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = modalRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusable || focusable.length === 0) {
        // Nothing to tab to — prevent the trap from leaking to the background.
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      // Restore focus to the trigger element.
      if (triggerRef.current && document.contains(triggerRef.current)) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="modal-backdrop"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={modalRef}
      >
        <div className="modal__header">
          <h2 id={titleId} className="modal__title">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="modal__close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
