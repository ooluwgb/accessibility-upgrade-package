import React, { useRef, useState, useEffect } from 'react';
import FormField from '../components/FormField';
import NotificationBanner from '../components/NotificationBanner';

const DEPARTMENTS = [
  { value: '',                  label: 'Select a department', disabled: true },
  { value: 'driver-services',   label: 'Driver Services' },
  { value: 'business-licensing',label: 'Business Licensing' },
  { value: 'property-tax',      label: 'Property Tax' },
  { value: 'vital-records',     label: 'Vital Records' },
  { value: 'utilities',         label: 'Utilities' },
  { value: 'building-permits',  label: 'Building & Permits' },
  { value: 'general-inquiry',   label: 'General Inquiry' },
];

const FIELD_ORDER = ['name', 'email', 'department', 'message'];
const FIELD_LABELS = {
  name: 'Full name',
  email: 'Email address',
  department: 'Department',
  message: 'Message',
};

/**
 * Contact form.
 *
 * Fixes vs. baseline:
 *  - Name, Email, Department, and Message all use <FormField>, so label,
 *    error, help-text, and aria-describedby wiring is consistent.
 *  - Name/Email carry autoComplete="name" / "email" (WCAG 1.3.5).
 *  - On invalid submit, an error summary is rendered, focused, and lists
 *    each invalid field as an in-page link (WCAG 3.3.1 / 3.3.3 improvement).
 *  - On success, focus moves to the success banner so it is actually heard.
 */
export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fieldRefs = {
    name: useRef(null),
    email: useRef(null),
    department: useRef(null),
    message: useRef(null),
  };
  const errorSummaryRef = useRef(null);
  const successBannerRef = useRef(null);

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required.';
    if (!form.email.trim()) next.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email address (for example: name@example.com).';
    if (!form.department) next.department = 'Please select a department.';
    if (!form.message.trim()) next.message = 'Message is required.';
    else if (form.message.trim().length < 20)
      next.message = 'Message must be at least 20 characters.';
    return next;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  // After errors render, pull focus to the error summary so a SR user hears it.
  useEffect(() => {
    if (Object.keys(errors).length > 0 && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
  }, [errors]);

  // After a successful submission, pull focus to the success banner.
  useEffect(() => {
    if (submitted && successBannerRef.current) {
      successBannerRef.current.focus();
    }
  }, [submitted]);

  if (submitted) {
    return (
      <main id="main-content" tabIndex={-1}>
        <div className="page">
          <h1>Message sent</h1>
          <div ref={successBannerRef} tabIndex={-1}>
            <NotificationBanner
              type="success"
              message="Your message has been submitted. We will respond within 2 business days."
            />
          </div>
        </div>
      </main>
    );
  }

  const orderedErrors = FIELD_ORDER
    .filter((name) => errors[name])
    .map((name) => ({ name, message: errors[name] }));

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="page">
        <h1>Contact us</h1>
        <p className="page__lead">
          Fields marked with
          <span aria-hidden="true"> *</span>
          <span className="sr-only"> an asterisk</span> are required.
        </p>

        {orderedErrors.length > 0 && (
          <div
            ref={errorSummaryRef}
            className="error-summary"
            role="alert"
            tabIndex={-1}
            aria-labelledby="error-summary-title"
          >
            <h2 id="error-summary-title" className="error-summary__title">
              There {orderedErrors.length === 1 ? 'is 1 problem' : `are ${orderedErrors.length} problems`} with your submission
            </h2>
            <ul className="error-summary__list">
              {orderedErrors.map(({ name, message }) => (
                <li key={name}>
                  <a
                    href={`#field-${name}`}
                    onClick={(e) => {
                      e.preventDefault();
                      fieldRefs[name].current?.focus();
                    }}
                  >
                    {FIELD_LABELS[name]}: {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
          style={{ maxWidth: '560px' }}
        >
          <FormField
            id="field-name"
            ref={fieldRefs.name}
            label={FIELD_LABELS.name}
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
            error={errors.name}
          />

          <FormField
            id="field-email"
            ref={fieldRefs.email}
            label={FIELD_LABELS.email}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            error={errors.email}
            helpText="We will only use this to respond to your inquiry."
          />

          <FormField
            id="field-department"
            ref={fieldRefs.department}
            as="select"
            label={FIELD_LABELS.department}
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            error={errors.department}
            options={DEPARTMENTS}
          />

          <FormField
            id="field-message"
            ref={fieldRefs.message}
            as="textarea"
            label={FIELD_LABELS.message}
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            error={errors.message}
            helpText="Please include any reference numbers that apply."
            rows={5}
          />

          <button type="submit" className="primary-button">
            Submit message
          </button>
        </form>
      </div>
    </main>
  );
}
