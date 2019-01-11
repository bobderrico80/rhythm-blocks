import whole from '../assets/svg/whole.svg';
import halfNote from '../assets/svg/half-note.svg';
import quarterNote from '../assets/svg/quarter-note.svg';
import quaver from '../assets/svg/quaver.svg';
import quarterNoteRest from '../assets/svg/quarter-note-rest.svg';

export enum NoteBlockType {
  WHOLE_NOTE = 'WHOLE_NOTE',
  HALF_NOTE = 'HALF_NOTE',
  QUARTER_NOTE = 'QUARTER_NOTE',
  DOUBLE_8TH_NOTES = 'DOUBLE_8TH_NOTES',
  QUARTER_NOTE_REST = 'QUARTER_NOTE_REST',
}

export interface NoteBlockPattern {
  note: string;
  isRest: boolean;
}

export interface NoteBlockDefinition {
  id?: string;
  type: NoteBlockType;
  svg: string;
  alt: string;
  css: string;
  duration: number;
  pattern: NoteBlockPattern[];
}

export interface NoteBlockDefinitionMap {
  [noteBlockType: string]: NoteBlockDefinition;
}

const NOTE_BLOCK_PATTERNS = {
  WHOLE_NOTE: { note: '1m', isRest: false },
  HALF_NOTE: { note: '2n', isRest: false },
  QUARTER_NOTE: { note: '4n', isRest: false },
  EIGHTH_NOTE: { note: '8n', isRest: false },
  QUARTER_REST: { note: '4n', isRest: true },
};

export const noteBlockDefinitions: NoteBlockDefinition[] = [
  {
    type: NoteBlockType.WHOLE_NOTE,
    svg: whole,
    alt: 'Whole note',
    css: 'whole-note',
    duration: 4,
    pattern: [NOTE_BLOCK_PATTERNS.WHOLE_NOTE],
  },
  {
    type: NoteBlockType.HALF_NOTE,
    svg: halfNote,
    alt: 'Half note',
    css: 'half-note',
    duration: 2,
    pattern: [NOTE_BLOCK_PATTERNS.HALF_NOTE],
  },
  {
    type: NoteBlockType.QUARTER_NOTE,
    svg: quarterNote,
    alt: 'Quarter note',
    css: 'quarter-note',
    duration: 1,
    pattern: [NOTE_BLOCK_PATTERNS.QUARTER_NOTE],
  },
  {
    type: NoteBlockType.DOUBLE_8TH_NOTES,
    svg: quaver,
    alt: 'Two beamed 8th notes',
    css: 'quaver',
    duration: 1,
    pattern: [NOTE_BLOCK_PATTERNS.EIGHTH_NOTE, NOTE_BLOCK_PATTERNS.EIGHTH_NOTE],
  },
  {
    type: NoteBlockType.QUARTER_NOTE_REST,
    svg: quarterNoteRest,
    alt: 'Quarter rest',
    css: 'quarter-note-rest',
    duration: 1,
    pattern: [NOTE_BLOCK_PATTERNS.QUARTER_REST],
  },
];

export const noteBlockDefinitionMap: NoteBlockDefinitionMap = noteBlockDefinitions.reduce(
  (previousMap: NoteBlockDefinitionMap, noteBlockDefinition: NoteBlockDefinition) => ({
    ...previousMap,
    [noteBlockDefinition.type]: noteBlockDefinition,
  }),
  {},
);

export default noteBlockDefinitions;
