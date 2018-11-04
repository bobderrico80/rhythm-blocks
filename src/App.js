import React, { Component } from 'react';
import Measure from './components/Measure';
import NotePalette from './components/NotePalette';
import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paletteNoteCodes: ['w', 'h', 'q', 'ee', 'qr'],
      measures: [[]],
    };

    this.onUpdateMeasures = this.onUpdateMeasures.bind(this);
  }

  onUpdateMeasures(updateFunction) {
    this.setState(({ measures }) => ({ measures: updateFunction(measures) }));
  }

  render() {
    return (
      <div className={styles.app}>
        <section className={styles.canvas}>
          {this.state.measures.map((notes, index) => (
            <Measure
              key={index}
              index={index}
              beatsPerMeasure={4}
              notes={notes}
              onUpdate={this.onUpdateMeasures}
            />
          ))}
        </section>
        <section className={styles.palette}>
          <NotePalette
            className={styles.palette}
            paletteNoteCodes={this.state.paletteNoteCodes}
            onUpdateMeasures={this.onUpdateMeasures}
          />
        </section>
      </div>
    );
  }
}

export default App;
