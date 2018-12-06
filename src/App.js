import React from 'react';
import Composer from './components/Composer';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <Composer />
    </div>
  );
};

export default App;
