import { noteBlockTypes } from './constants';
import whole from '../assets/svg/whole.svg';
import halfNote from '../assets/svg/half-note.svg';
import quarterNote from '../assets/svg/quarter-note.svg';
import quaver from '../assets/svg/quaver.svg';
import quarterNoteRest from '../assets/svg/quarter-note-rest.svg';

export const noteBlocks = [
  {
    type: noteBlockTypes.WHOLE_NOTE,
    svg: whole,
    alt: 'Whole note',
    css: 'whole-note',
    duration: 4,
    pattern: ['1m'],
  },
  {
    type: noteBlockTypes.HALF_NOTE,
    svg: halfNote,
    alt: 'Half note',
    css: 'half-note',
    duration: 2,
    pattern: ['2n'],
  },
  {
    type: noteBlockTypes.QUARTER_NOTE,
    svg: quarterNote,
    alt: 'Quarter note',
    css: 'quarter-note',
    duration: 1,
    pattern: ['4n'],
  },
  {
    type: noteBlockTypes.DOUBLE_8TH_NOTES,
    svg: quaver,
    alt: 'Two beamed 8th notes',
    css: 'quaver',
    duration: 1,
    pattern: ['8n', '8n'],
  },
  {
    type: noteBlockTypes.QUARTER_NOTE_REST,
    svg: quarterNoteRest,
    alt: 'Quarter rest',
    css: 'quarter-note-rest',
    duration: 1,
    pattern: [{ note: '4n', isRest: true }],
  },
];

export const noteBlockMap = noteBlocks.reduce(
  (previousMap, note) => ({ ...previousMap, [note.type]: note }),
  {},
);

export default noteBlocks;
