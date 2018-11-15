import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Measure from './components/Measure';
import NotePalette from './components/NotePalette';
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
      measures: [
        {
          totalDuration: 0,
          notes: [],
        },
      ],
    };

    this.onMeasureDropNote = this.onMeasureDropNote.bind(this);
    this.onNoteRemove = this.onNoteRemove.bind(this);
  }

  static calculateTotalDuration(measureNotes) {
    return measureNotes.reduce((totalDuration, note) => (totalDuration += note.duration), 0);
  }

  addNoteToMeasure(measureIndex, noteType) {
    const newNote = createNotes(noteType);

    this.setState(({ measures }) => {
      const updatedMeasures = [...measures];
      const updatedMeasureNotes = [...measures[measureIndex].notes, ...newNote];
      const updatedMeasure = {
        notes: updatedMeasureNotes,
        totalDuration: App.calculateTotalDuration(updatedMeasureNotes),
      };

      updatedMeasures[measureIndex] = updatedMeasure;

      return { measures: updatedMeasures };
    });
  }

  onMeasureDropNote({ measureIndex, dropType, noteId, noteType }) {
    if (dropType === dropTypes.PALETTE_NOTE_BLOCK) {
      this.addNoteToMeasure(measureIndex, noteType);
    }

    // TODO: handle moving notes to other measures
  }

  onNoteRemove(measureIndex, noteId) {
    this.setState(({ measures }) => {
      const updatedMeasures = [...measures];
      const updatedMeasureNotes = updatedMeasures[measureIndex].notes.filter(
        note => note.id !== noteId,
      );

      const updatedMeasure = {
        notes: updatedMeasureNotes,
        totalDuration: App.calculateTotalDuration(updatedMeasureNotes),
      };

      updatedMeasures[measureIndex] = updatedMeasure;

      return { measures: updatedMeasures };
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <section className={styles.canvas}>
          {this.state.measures.map(({ notes, totalDuration }, index) => (
            <Measure
              key={index}
              index={index}
              beatsPerMeasure={4}
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
