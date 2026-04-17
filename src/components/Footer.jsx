import React from 'react';

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Accessibility Statement', href: '/accessibility-statement' },
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'Site Map', href: '/site-map' },
];

/**
 * Site footer.
 * - Uses native <footer> (implicit role="contentinfo") without duplicating
 *   the role attribute.
 * - Link colors chosen for >=4.5:1 contrast against the dark teal background.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <nav aria-label="Footer">
        <ul className="site-footer__list">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="site-footer__link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="site-footer__copy">
        &copy; 2024 CitizenConnect. An official government website.
      </p>
    </footer>
  );
}
