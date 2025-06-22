import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/dashboard">
          <Heading text="CourseSphere" level={3} />
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/dashboard">
          <Button text="Home" />
        </Link>
        <Button text="Sair" onClick={logout} />
      </div>
    </nav>
  );
};

export default Navbar;