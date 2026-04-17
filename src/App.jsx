import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ContactForm from './pages/ContactForm';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-shell__main-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactForm />} />
          {/* Unknown routes fall back to Home so the a11y landmarks are intact. */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
