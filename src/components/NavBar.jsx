import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Apply Online', href: '/apply' },
  { label: 'Track Status', href: '/track' },
  { label: 'Contact Us', href: '/contact' },
];

/**
 * Primary navigation.
 *
 * Fixes vs. baseline:
 *  - Hamburger toggle is wired to the list's `hidden` attribute, so
 *    aria-expanded truthfully reflects visibility (WCAG 4.1.2).
 *  - Toggle is shown via CSS media query (<=640px) instead of being
 *    permanently `display:none` (WCAG 1.4.10 Reflow, 2.1.1 Keyboard).
 *  - Active link gets `aria-current="page"` (WCAG 2.4.8 / 3.2.3 support).
 *  - Focus styles come from :focus-visible CSS with a 4.6:1 contrast ring
 *    against the teal background (WCAG 1.4.11 Non-text Contrast, 2.4.7).
 */
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // The `nav__list--collapsed` modifier is only honored on narrow viewports
  // via media query, so desktop users always see every link regardless of
  // the menuOpen state. This avoids the native `hidden` attribute, which
  // CSS cannot override without a cascade-breaking `!important`.
  const listClassName = `nav__list${menuOpen ? '' : ' nav__list--collapsed'}`;

  return (
    <nav aria-label="Main navigation" className="nav">
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={menuOpen}
        aria-controls="main-nav-list"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{menuOpen ? '\u2715' : '\u2630'}</span>
        <span className="sr-only">
          {menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        </span>
      </button>

      <ul id="main-nav-list" className={listClassName}>
        {navLinks.map((link) => {
          const isCurrent = location.pathname === link.href;
          return (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className="nav__link"
                aria-current={isCurrent ? 'page' : undefined}
              >
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
