import React from 'react';
import Header from './components/Header';
import Composer from './components/Composer';
import AboutModal from './components/AboutModal';
import styles from './App.module.css';

class App extends React.Component {
  state = {
    aboutModalOpen: false,
  };

  onAboutButtonClick = () => {
    this.setState({ aboutModalOpen: true });
  };

  onAboutModalClose = () => {
    this.setState({ aboutModalOpen: false });
  };

  render() {
    return (
      <div className={styles.app}>
        <Header onAboutButtonClick={this.onAboutButtonClick} />
        <Composer />
        <AboutModal isOpen={this.state.aboutModalOpen} onClose={this.onAboutModalClose} />
      </div>
    );
  }
}

export default App;
