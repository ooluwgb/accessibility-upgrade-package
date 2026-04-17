import React, { useState } from 'react';

/**
 * Service search.
 * - Uses a real visible <label> (via .sr-only) tied to the input with
 *   htmlFor/id. No redundant aria-label that would override the label.
 * - role="search" landmark so assistive tech can jump to the search form.
 * - autoComplete="off" because service search queries are not credentials.
 */
export default function SearchBar() {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // intentionally a no-op in this reference implementation
  }

  return (
    <section aria-labelledby="search-heading" className="search-section">
      <h2 id="search-heading">Find a service</h2>
      <form
        role="search"
        aria-label="Search government services"
        onSubmit={handleSubmit}
        className="search-form"
      >
        <label htmlFor="service-search" className="sr-only">
          Search for government services
        </label>
        <input
          id="service-search"
          name="q"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. renew driver's license, apply for permit..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </section>
  );
}
