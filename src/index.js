import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import LoginProvider from './context/LoginProvider';
import HomeProvider from './context/HomeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <HomeProvider>
          <App />
        </HomeProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
