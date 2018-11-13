import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Measure from './components/Measure';
import NotePalette from './components/NotePalette';
import { noteIds } from './lib/constants';
import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paletteNoteIds: [
        noteIds.WHOLE_NOTE,
        noteIds.HALF_NOTE,
        noteIds.QUARTER_NOTE,
        noteIds.DOUBLE_8TH_NOTES,
        noteIds.QUARTER_NOTE_REST,
      ],
      measures: [[]],
    };

    this.onAddNote = this.onAddNote.bind(this);
  }

  onAddNote(measureIndex, noteId) {
    console.log(measureIndex, noteId);
    this.setState(({ measures }) => {
      const nextMeasure = [...measures[measureIndex], noteId];
      const nextMeasures = [...measures];
      nextMeasures[measureIndex] = nextMeasure;

      return { measures: nextMeasures };
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <section className={styles.canvas}>
          {this.state.measures.map((noteIds, index) => (
            <Measure
              key={index}
              index={index}
              beatsPerMeasure={4}
              noteIds={noteIds}
              onAddNote={this.onAddNote}
            />
          ))}
        </section>
        <section className={styles.palette}>
          <NotePalette className={styles.palette} paletteNoteIds={this.state.paletteNoteIds} />
        </section>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
