import React, { useId, forwardRef } from 'react';

/**
 * Accessible form field with support for text inputs, <select>, and <textarea>.
 *
 * Fixes vs. baseline:
 *  - Exposes `autoComplete` prop (WCAG 1.3.5 Identify Input Purpose).
 *  - Renders <select> or <textarea> via `as` prop so ContactForm no longer
 *    re-implements label/error plumbing for those controls.
 *  - Error text uses `aria-live="polite"` rather than `role="alert"` on every
 *    mount, which was double-announcing after each keystroke. The error is
 *    associated via `aria-describedby` + `aria-invalid` so SR users still
 *    hear it when they move into the invalid field.
 *  - forwardRef so the parent can focus the first invalid field by ref
 *    instead of querying the DOM.
 */
const FormField = forwardRef(function FormField(
  {
    label,
    type = 'text',
    name,
    value,
    onChange,
    required = false,
    error,
    helpText,
    autoComplete,
    as = 'input',
    options,
    rows = 5,
    id: providedId,
  },
  ref
) {
  const reactId = useId();
  const id = providedId || reactId;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  const describedBy =
    [error ? errorId : '', helpText ? helpId : ''].filter(Boolean).join(' ') ||
    undefined;

  const commonProps = {
    id,
    name,
    ref,
    value,
    onChange,
    required,
    'aria-required': required || undefined,
    'aria-describedby': describedBy,
    'aria-invalid': error ? 'true' : undefined,
    autoComplete,
    className: `field__control${error ? ' field__control--invalid' : ''}`,
  };

  let control;
  if (as === 'select') {
    control = (
      <select {...commonProps}>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else if (as === 'textarea') {
    control = <textarea {...commonProps} rows={rows} />;
  } else {
    control = <input {...commonProps} type={type} />;
  }

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="field__required-star">
              *
            </span>
            <span className="sr-only"> required</span>
          </>
        )}
      </label>

      {helpText && (
        <span id={helpId} className="field__help">
          {helpText}
        </span>
      )}

      {control}

      <span
        id={errorId}
        className="field__error"
        aria-live="polite"
        /* Hidden when there is no error so SRs don't announce an empty node */
        hidden={!error}
      >
        {error || ''}
      </span>
    </div>
  );
});

export default FormField;
