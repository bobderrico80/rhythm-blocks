import React from 'react';
import whole from '../assets/svg/whole.svg';
import halfNote from '../assets/svg/half-note.svg';
import quarterNote from '../assets/svg/quarter-note.svg';
import quaver from '../assets/svg/quaver.svg';
import quarterNoteRest from '../assets/svg/quarter-note-rest.svg';
import styles from './NoteBlock.module.css';

const noteCodeMap = {
  w: {
    svg: whole,
    alt: 'Whole note',
    css: 'whole-note',
  },
  h: {
    svg: halfNote,
    alt: 'Half note',
    css: 'half-note',
  },
  q: {
    svg: quarterNote,
    alt: 'Quarter note',
    css: 'quarter-note',
  },
  ee: {
    svg: quaver,
    alt: 'Two beamed 8th notes',
    css: 'quaver',
  },
  qr: {
    svg: quarterNoteRest,
    alt: 'Quarter rest',
    css: 'quarter-note-rest',
  },
};

const lookupNote = noteCode => {
  const note = noteCodeMap[noteCode];

  if (!note) {
    throw new Error(`Note code '${noteCode}' is not found in the noteCodeMap`);
  }

  return note;
};

const NoteBlock = ({ noteCode }) => {
  const note = lookupNote(noteCode);
  return (
    <div className={`${styles.note} ${styles[note.css]}`}>
      <img src={note.svg} alt={note.alt} />
    </div>
  );
};

export default NoteBlock;
