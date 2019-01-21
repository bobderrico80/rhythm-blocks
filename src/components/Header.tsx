import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import icon from '../assets/svg/ui/rb-icon.svg';

export interface HeaderProps {
  onAboutButtonClick: (event: any) => void;
}

const Header = ({ onAboutButtonClick }: HeaderProps) => (
  <header className={styles.header}>
    <h1 className={styles.banner}>
      <img src={icon} alt="" />
      Rhythm Blocks
      <small className={styles.versionText}>Alpha</small>
    </h1>
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

export default Header;
