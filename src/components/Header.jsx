import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SkipLink from './SkipLink';

/**
 * Site header.
 * - Uses the native <header> landmark (implicit role="banner"). We do NOT add
 *   role="banner" because the element is already at the top level of <body>.
 * - The wordmark is a real link back to "/" with descriptive accessible name.
 */
export default function Header() {
  return (
    <header className="site-header">
      <SkipLink />
      <Link
        to="/"
        className="site-header__brand"
        aria-label="CitizenConnect home"
      >
        <span className="site-title">CitizenConnect</span>
        <span className="site-tagline">&mdash; Public Services Portal</span>
      </Link>
      <NavBar />
    </header>
  );
}
