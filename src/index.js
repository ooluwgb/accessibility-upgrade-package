import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Runtime axe-core checks in development only.
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
