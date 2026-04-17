# CitizenConnect - Public Services Portal

[![Accessibility CI](https://github.com/ooluwgb/accessibility-upgrade-package/actions/workflows/accessibility.yml/badge.svg?branch=main)](https://github.com/ooluwgb/accessibility-upgrade-package/actions/workflows/accessibility.yml)

React 18 reference implementation of a public-facing citizen services portal.
This "after" package ships the accessibility upgrades described in
`AccessibilityUpgradePackageWCAG2-2-2.pdf`.

## Getting started

```bash
npm ci
npm start            # dev server on http://localhost:3000
```

In development mode, `@axe-core/react` runs live and prints WCAG violations to
the browser console so regressions are visible immediately.

## Scripts

| Command               | What it does                                             |
| --------------------- | -------------------------------------------------------- |
| `npm start`           | Start the CRA dev server.                                |
| `npm run build`       | Produce a production bundle in `build/`.                 |
| `npm test`            | Run unit + `jest-axe` accessibility tests once.          |
| `npm run test:a11y`   | Run only the tests in `src/__tests__/`.                  |
| `npm run lint`        | Run ESLint with `eslint-plugin-jsx-a11y`.                |
| `npm run pa11y`       | Serve `build/` and run `pa11y-ci` against it.            |

## Accessibility testing layers

1. **Static linting** - `eslint-plugin-jsx-a11y` catches missing labels,
   invalid roles, and obviously broken ARIA at code-review time.
2. **Runtime component tests** - `jest-axe` asserts each page and shared
   component renders with zero axe violations, and that focus/aria behavior
   matches expectations (error summary focus, modal focus restore, nav
   `aria-current`, etc.).
3. **End-to-end page scan** - `pa11y-ci` hits the built, served app with the
   WCAG 2.1 AA ruleset from `.pa11yci.json`.
4. **Dev-time runtime scan** - `@axe-core/react` logs issues to the console
   while you develop.

## Components at a glance

| File                                 | Purpose                                            |
| ------------------------------------ | -------------------------------------------------- |
| `src/components/SkipLink.jsx`        | Bypass-block skip link (WCAG 2.4.1).               |
| `src/components/Header.jsx`          | Banner landmark + wordmark + nav.                  |
| `src/components/NavBar.jsx`          | Navigation landmark with aria-current + toggle.    |
| `src/components/Footer.jsx`          | Contentinfo landmark + legal links.                |
| `src/components/SearchBar.jsx`       | `role="search"` form with a real label.            |
| `src/components/ServiceCard.jsx`     | Service tile with a self-descriptive link.         |
| `src/components/FormField.jsx`       | Accessible input/select/textarea primitive.        |
| `src/components/Modal.jsx`           | Dialog with focus trap, Escape, focus restore.     |
| `src/components/NotificationBanner.jsx` | Status / alert banner with correct live region. |
| `src/pages/Home.jsx`                 | Home page with `<h1>` + service grid.              |
| `src/pages/ContactForm.jsx`          | Contact form with error summary + success banner.  |

## WCAG 2.1 AA coverage

- **1.3.1 Info and Relationships** - semantic landmarks, labelled controls,
  real heading order.
- **1.3.5 Identify Input Purpose** - `autocomplete="name" | "email"` on the
  contact form.
- **1.4.3 Contrast (Minimum)** - footer and form colors retuned for >=4.5:1.
- **1.4.10 Reflow** - NavBar is keyboard-usable at narrow widths via a real
  toggle and `hidden` list (no `display:none` lockout).
- **1.4.11 Non-text Contrast** - focus-visible ring color chosen for >=3:1.
- **2.1.1 Keyboard** / **2.1.2 No Keyboard Trap** - Modal uses a proper
  button backdrop, broadened focusable selector, and focus restore on close.
- **2.4.1 Bypass Blocks** - SkipLink with transform-based visibility.
- **2.4.3 Focus Order** - Modal returns focus to the trigger on close;
  invalid form submit moves focus to an error summary.
- **2.4.4 Link Purpose** / **2.5.3 Label in Name** - ServiceCard link text
  now includes the service title (visible + accessible names aligned).
- **2.4.6 Headings and Labels** - `<h1>` on every page.
- **2.4.7 Focus Visible** - global `:focus-visible` styles.
- **3.3.1 / 3.3.3 Error Identification / Suggestion** - error summary with
  per-field links, plus per-field errors associated by `aria-describedby`.
- **4.1.2 Name, Role, Value** - `aria-expanded` / `aria-controls` correctly
  reflect nav visibility.
- **4.1.3 Status Messages** - NotificationBanner picks `role="alert"` for
  errors and `role="status"` + `aria-live="polite"` for everything else.
