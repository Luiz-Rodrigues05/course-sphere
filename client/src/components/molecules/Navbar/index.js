import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import styles from './Navbar.module.css';

import { IoSchoolSharp, IoHome, IoLogOutOutline } from 'react-icons/io5';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <Link to="/dashboard" className={styles.logoLink}>
        <IoSchoolSharp className={styles.logoIcon} />
        <Heading text="CourseSphere" level={3} />
      </Link>

      <div className={styles.navLinks}>
        <Link to="/dashboard">
          <Button variant="ghost">
            <IoHome />
            Home
          </Button>
        </Link>
        <Button variant="ghost" onClick={logout}>
          <IoLogOutOutline />
          Sair
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;