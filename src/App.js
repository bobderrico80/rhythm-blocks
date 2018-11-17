import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Measure from './components/Measure';
import NotePalette from './components/NotePalette';
import createMeasures from './lib/createMeasures';
import createNotes from './lib/createNotes';
import { noteTypes, dropTypes } from './lib/constants';
import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paletteNotes: createNotes(
        [
          noteTypes.WHOLE_NOTE,
          noteTypes.HALF_NOTE,
          noteTypes.QUARTER_NOTE,
          noteTypes.DOUBLE_8TH_NOTES,
          noteTypes.QUARTER_NOTE_REST,
        ],
        note => `palette-${note.type.description}`,
      ),
      measures: createMeasures(4, 4, 4, 4),
    };

    this.onMeasureDropNote = this.onMeasureDropNote.bind(this);
    this.onNoteRemove = this.onNoteRemove.bind(this);
  }

  static calculateTotalDuration(measureNotes) {
    return measureNotes.reduce((totalDuration, note) => (totalDuration += note.duration), 0);
  }

  updateMeasure(measureIndex, updateMeasureNoteFunction) {
    this.setState(({ measures }) => {
      const previousMeasure = measures[measureIndex];
      const updatedMeasures = [...measures];
      const updatedMeasureNotes = updateMeasureNoteFunction(previousMeasure.notes);

      updatedMeasures[measureIndex] = {
        ...previousMeasure,
        notes: updatedMeasureNotes,
        totalDuration: App.calculateTotalDuration(updatedMeasureNotes),
      };

      return { measures: updatedMeasures };
    });
  }

  addNoteToMeasure(measureIndex, noteType) {
    const newNote = createNotes(noteType);
    this.updateMeasure(measureIndex, previousMeasureNotes => [...previousMeasureNotes, ...newNote]);
  }

  removeNoteFromMeasure(measureIndex, noteId) {
    this.updateMeasure(measureIndex, previousMeasureNotes =>
      previousMeasureNotes.filter(note => note.id !== noteId),
    );
  }

  onMeasureDropNote({ measureIndex, noteType }) {
    this.addNoteToMeasure(measureIndex, noteType);
  }

  onNoteRemove(measureIndex, noteId) {
    this.removeNoteFromMeasure(measureIndex, noteId);
  }

  render() {
    return (
      <div className={styles.app}>
        <section className={styles.canvas}>
          {this.state.measures.map(({ notes, totalDuration, beatsPerMeasure }, index) => (
            <Measure
              key={index}
              index={index}
              beatsPerMeasure={beatsPerMeasure}
              totalDuration={totalDuration}
              notes={notes}
              onDropNote={this.onMeasureDropNote}
              onNoteRemove={this.onNoteRemove}
            />
          ))}
        </section>
        <section className={styles.palette}>
          <NotePalette className={styles.palette} paletteNotes={this.state.paletteNotes} />
        </section>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
