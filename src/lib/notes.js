import { noteTypes } from './constants';
import whole from '../assets/svg/whole.svg';
import halfNote from '../assets/svg/half-note.svg';
import quarterNote from '../assets/svg/quarter-note.svg';
import quaver from '../assets/svg/quaver.svg';
import quarterNoteRest from '../assets/svg/quarter-note-rest.svg';

export const notes = [
  {
    type: noteTypes.WHOLE_NOTE,
    svg: whole,
    alt: 'Whole note',
    css: 'whole-note',
    duration: 4,
  },
  {
    type: noteTypes.HALF_NOTE,
    svg: halfNote,
    alt: 'Half note',
    css: 'half-note',
    duration: 2,
  },
  {
    type: noteTypes.QUARTER_NOTE,
    svg: quarterNote,
    alt: 'Quarter note',
    css: 'quarter-note',
    duration: 1,
  },
  {
    type: noteTypes.DOUBLE_8TH_NOTES,
    svg: quaver,
    alt: 'Two beamed 8th notes',
    css: 'quaver',
    duration: 1,
  },
  {
    type: noteTypes.QUARTER_NOTE_REST,
    svg: quarterNoteRest,
    alt: 'Quarter rest',
    css: 'quarter-note-rest',
    duration: 1,
  },
];

export const noteMap = notes.reduce(
  (previousMap, note) => ({ ...previousMap, [note.type]: note }),
  {},
);

export default notes;
