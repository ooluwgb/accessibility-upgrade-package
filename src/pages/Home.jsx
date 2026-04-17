import React from 'react';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';

const services = [
  {
    title: "Driver's License Renewal",
    category: 'Transportation',
    description:
      "Renew your driver's license online in minutes. Have your current license and payment ready.",
    href: '/services/drivers-license',
  },
  {
    title: 'Business Permit Application',
    category: 'Business',
    description:
      'Apply for a new business operating permit or renew an existing one for your business.',
    href: '/services/business-permit',
  },
  {
    title: 'Property Tax Payment',
    category: 'Finance',
    description:
      'Pay your annual property taxes securely online. View payment history and print receipts.',
    href: '/services/property-tax',
  },
  {
    title: 'Vital Records Request',
    category: 'Records',
    description:
      'Request certified copies of birth, death, or marriage certificates for official use.',
    href: '/services/vital-records',
  },
  {
    title: 'Utility Bill Payment',
    category: 'Utilities',
    description:
      'Pay water, sewer, and solid waste bills online. Set up AutoPay to avoid late fees.',
    href: '/services/utility-bills',
  },
  {
    title: 'Building Permit',
    category: 'Construction',
    description:
      'Submit building permit applications for residential or commercial construction projects.',
    href: '/services/building-permit',
  },
];

/**
 * Home page.
 *
 * Fixes vs. baseline:
 *  - Has a real <h1> at the top (WCAG 1.3.1 / 2.4.6 heading order).
 *  - <main id="main-content" tabIndex={-1}> remains so the skip link can
 *    programmatically focus it, but focus ring comes from :focus-visible CSS.
 */
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="page">
        <h1>Public services portal</h1>
        <p className="page__lead">
          Access government services, pay bills, apply for permits, and track
          your requests from one place.
        </p>
      </div>

      <SearchBar />

      <section aria-labelledby="services-heading" className="page">
        <h2 id="services-heading">Popular services</h2>
        <ul className="service-grid">
          {services.map((service) => (
            <li key={service.href}>
              <ServiceCard {...service} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
