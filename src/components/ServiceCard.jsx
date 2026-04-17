import React, { useId } from 'react';

/**
 * A tile that advertises a single public service.
 *
 * Fixes vs. baseline:
 *  - Visible link text now includes the service title ("Learn more about X"),
 *    which satisfies WCAG 2.5.3 Label in Name (the accessible name contains
 *    the visible label) and helps voice-control users.
 *  - Article is labelled by the heading via a unique useId(), removing the
 *    risk of duplicate IDs if titles collide.
 */
export default function ServiceCard({ title, description, href, category }) {
  const titleId = useId();

  return (
    <article aria-labelledby={titleId} className="service-card">
      {category && (
        <span className="service-card__category">{category}</span>
      )}
      <h3 id={titleId} className="service-card__title">
        {title}
      </h3>
      <p className="service-card__description">{description}</p>
      <a href={href} className="service-card__link">
        Learn more<span className="sr-only"> about {title}</span>
      </a>
    </article>
  );
}
