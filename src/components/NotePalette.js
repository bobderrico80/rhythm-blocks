import React from 'react';
import NoteBlock from './NoteBlock';
import styles from './NotePalette.module.css';
import createNotes from '../lib/createNotes';
import { noteDropActionTypes } from '../lib/constants';

class NotePalette extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notes = createNotes(...this.props.paletteNoteCodes);

    return (
      <div className={styles.notePalette}>
        {notes.map(note => {
          return <NoteBlock className={styles.notePaletteNote} key={note.id} {...note} />;
        })}
      </div>
    );
  }
}

export default NotePalette;
