import whole from '../assets/svg/whole.svg';
import halfNote from '../assets/svg/half-note.svg';
import quarterNote from '../assets/svg/quarter-note.svg';
import quaver from '../assets/svg/quaver.svg';
import quarterNoteRest from '../assets/svg/quarter-note-rest.svg';

const noteCodeMap = {
  w: {
    id: 'w',
    svg: whole,
    alt: 'Whole note',
    css: 'whole-note',
    duration: 4,
  },
  h: {
    id: 'h',
    svg: halfNote,
    alt: 'Half note',
    css: 'half-note',
    duration: 2,
  },
  q: {
    id: 'q',
    svg: quarterNote,
    alt: 'Quarter note',
    css: 'quarter-note',
    duration: 1,
  },
  ee: {
    id: 'ee',
    svg: quaver,
    alt: 'Two beamed 8th notes',
    css: 'quaver',
    duration: 1,
  },
  qr: {
    id: 'qr',
    svg: quarterNoteRest,
    alt: 'Quarter rest',
    css: 'quarter-note-rest',
    duration: 1,
  },
};

const lookupNote = noteCode => {
  return noteCodeMap[noteCode];
};

const createNotes = (...noteCodes) => {
  return noteCodes.map(noteCode => lookupNote(noteCode));
};

export default createNotes;
