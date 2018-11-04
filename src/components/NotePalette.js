import React from 'react';
import NoteBlock from './NoteBlock';
import styles from './NotePalette.module.css';
import createNotes from '../lib/createNotes';
import { noteDropActionTypes } from '../lib/constants';

class NotePalette extends React.Component {
  constructor(props) {
    super(props);

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDragEnter(event) {
    event.preventDefault();
  }

  onDragOver(event) {
    event.preventDefault();
  }

  onDrop(event) {
    event.preventDefault();

    const noteDropAction = JSON.parse(event.dataTransfer.getData('text/plain'));
    console.log('noteDropAction', typeof noteDropAction, noteDropAction);

    if (noteDropAction.type !== noteDropActionTypes.REMOVE_FROM_MEASURE) {
      return;
    }

    this.props.onUpdateMeasures(previousMeasures => {
      const newMeasures = [...previousMeasures];
      const currentMeasure = newMeasures[noteDropAction.payload.measureIndex];
      currentMeasure.splice(noteDropAction.payload.index, 1);

      return newMeasures;
    });
  }

  render() {
    const notes = createNotes(...this.props.paletteNoteCodes);

    return (
      <div
        className={styles.notePalette}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        {notes.map(note => {
          return (
            <NoteBlock
              className={styles.notePaletteNote}
              key={note.id}
              noteDropActionType={noteDropActionTypes.ADD_TO_MEASURE}
              {...note}
            />
          );
        })}
      </div>
    );
  }
}

export default NotePalette;
