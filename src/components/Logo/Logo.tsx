//Logo.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => (
  <div className={styles.logo}>
    <Link to='/'>
      <img src='/logo.svg' alt='logo' />
    </Link>
  </div>
);
