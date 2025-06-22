import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../organisms/Header';
import styles from './ProtectedLayout.module.css';

const ProtectedLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;