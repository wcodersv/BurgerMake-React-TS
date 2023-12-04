//Logo.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => (
  <div className={styles.logo}>
    <Link to='/'>
      <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='logo' />
    </Link>
  </div>
);
