// App.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './global.scss';
import './media.css'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function App() {

  return (
    <div className="app-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
