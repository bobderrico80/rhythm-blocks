import React from 'react';
import NoteBlock from './NoteBlock';
import styles from './NotePalette.module.css';

console.log('styles', typeof styles, styles);

const NotePalette = ({ paletteNotes }) => {
  return (
    <div className={styles.notePalette}>
      {paletteNotes.map(noteCode => (
        <NoteBlock key={noteCode} noteCode={noteCode} />
      ))}
    </div>
  );
};

export default NotePalette;
