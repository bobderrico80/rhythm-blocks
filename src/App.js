import React, { Component } from 'react';
import Measure from './components/Measure';
import NotePalette from './components/NotePalette';
import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paletteNoteCodes: ['w', 'h', 'q', 'ee', 'qr'],
    };
  }

  render() {
    return (
      <div className={styles.app}>
        <section className={styles.canvas}>
          <Measure beatsPerMeasure={4} />
        </section>
        <section className={styles.palette}>
          <NotePalette className={styles.palette} paletteNoteCodes={this.state.paletteNoteCodes} />
        </section>
      </div>
    );
  }
}

export default App;
