import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const propTypes = {
  onAboutButtonClick: PropTypes.func.isRequired,
};

const Header = ({ onAboutButtonClick }) => (
  <header className={styles.header}>
    <h1 className={styles.banner}>Rhythm Blocks</h1>
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <button className={styles.navButton} onClick={onAboutButtonClick}>
            About
          </button>
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = propTypes;

export default Header;
