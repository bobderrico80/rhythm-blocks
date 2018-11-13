import { noteIds } from './constants';
import whole from '../assets/svg/whole.svg';
import halfNote from '../assets/svg/half-note.svg';
import quarterNote from '../assets/svg/quarter-note.svg';
import quaver from '../assets/svg/quaver.svg';
import quarterNoteRest from '../assets/svg/quarter-note-rest.svg';

const notes = {
  [noteIds.WHOLE_NOTE]: {
    id: noteIds.WHOLE_NOTE,
    svg: whole,
    alt: 'Whole note',
    css: 'whole-note',
    duration: 4,
  },
  [noteIds.HALF_NOTE]: {
    id: noteIds.HALF_NOTE,
    svg: halfNote,
    alt: 'Half note',
    css: 'half-note',
    duration: 2,
  },
  [noteIds.QUARTER_NOTE]: {
    id: noteIds.QUARTER_NOTE,
    svg: quarterNote,
    alt: 'Quarter note',
    css: 'quarter-note',
    duration: 1,
  },
  [noteIds.DOUBLE_8TH_NOTES]: {
    id: noteIds.DOUBLE_8TH_NOTES,
    svg: quaver,
    alt: 'Two beamed 8th notes',
    css: 'quaver',
    duration: 1,
  },
  [noteIds.QUARTER_NOTE_REST]: {
    id: noteIds.QUARTER_NOTE_REST,
    svg: quarterNoteRest,
    alt: 'Quarter rest',
    css: 'quarter-note-rest',
    duration: 1,
  },
};

export default notes;
