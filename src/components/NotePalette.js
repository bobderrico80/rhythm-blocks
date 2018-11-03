import React from 'react';
import NoteBlock from './NoteBlock';
import styles from './NotePalette.module.css';
import createNotes from '../lib/createNotes';

const NotePalette = ({ paletteNoteCodes }) => {
  const notes = createNotes(...paletteNoteCodes);

  return (
    <div className={styles.notePalette}>
      {notes.map(note => {
        return <NoteBlock className={styles.notePaletteNote} key={note.id} {...note} />;
      })}
    </div>
  );
};

export default NotePalette;
