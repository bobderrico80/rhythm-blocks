import wholeNote from '../assets/svg/music/whole-note.svg';
import halfNote from '../assets/svg/music/half-note.svg';
import quarterNote from '../assets/svg/music/quarter-note.svg';
import twoBeamed8thNotes from '../assets/svg/music/2-beamed-8th-notes.svg';
import quarterRest from '../assets/svg/music/quarter-rest.svg';
import fourBeamed16thNotes from '../assets/svg/music/4-beamed-16th-notes.svg';

export enum NoteBlockType {
  WHOLE_NOTE = 'WHOLE_NOTE',
  HALF_NOTE = 'HALF_NOTE',
  QUARTER_NOTE = 'QUARTER_NOTE',
  DOUBLE_8TH_NOTES = 'DOUBLE_8TH_NOTES',
  QUARTER_REST = 'QUARTER_REST',
  FOUR_BEAMED_16TH_NOTES = 'FOUR_BEAMED_16TH_NOTES',
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
  SIXTEENTH_NOTE: { note: '16n', isRest: false },
  QUARTER_REST: { note: '4n', isRest: true },
};

export const noteBlockDefinitions: NoteBlockDefinition[] = [
  {
    type: NoteBlockType.WHOLE_NOTE,
    svg: wholeNote,
    alt: 'Whole note',
    css: 'wholeNote',
    duration: 4,
    pattern: [NOTE_BLOCK_PATTERNS.WHOLE_NOTE],
  },
  {
    type: NoteBlockType.HALF_NOTE,
    svg: halfNote,
    alt: 'Half note',
    css: 'halfNote',
    duration: 2,
    pattern: [NOTE_BLOCK_PATTERNS.HALF_NOTE],
  },
  {
    type: NoteBlockType.QUARTER_NOTE,
    svg: quarterNote,
    alt: 'Quarter note',
    css: 'quarterNote',
    duration: 1,
    pattern: [NOTE_BLOCK_PATTERNS.QUARTER_NOTE],
  },
  {
    type: NoteBlockType.DOUBLE_8TH_NOTES,
    svg: twoBeamed8thNotes,
    alt: 'Two beamed 8th notes',
    css: 'twoBeamed8thNotes',
    duration: 1,
    pattern: [NOTE_BLOCK_PATTERNS.EIGHTH_NOTE, NOTE_BLOCK_PATTERNS.EIGHTH_NOTE],
  },
  {
    type: NoteBlockType.FOUR_BEAMED_16TH_NOTES,
    svg: fourBeamed16thNotes,
    alt: 'Four beamed 16th notes',
    css: 'fourBeamed16thNotes',
    duration: 1,
    pattern: [
      NOTE_BLOCK_PATTERNS.SIXTEENTH_NOTE,
      NOTE_BLOCK_PATTERNS.SIXTEENTH_NOTE,
      NOTE_BLOCK_PATTERNS.SIXTEENTH_NOTE,
      NOTE_BLOCK_PATTERNS.SIXTEENTH_NOTE,
    ],
  },
  {
    type: NoteBlockType.QUARTER_REST,
    svg: quarterRest,
    alt: 'Quarter rest',
    css: 'quarterRest',
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
