import React, { Component } from 'react';
import NotePalette from './components/NotePalette';
import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paletteNotes: ['w', 'h', 'q', 'ee', 'qr'],
    };
  }
  render() {
    return (
      <div className={styles.app}>
        <section>Canvas</section>
        <section className={styles.palette}>
          <NotePalette className={styles.palette} paletteNotes={this.state.paletteNotes} />
        </section>
      </div>
    );
  }
}

export default App;
