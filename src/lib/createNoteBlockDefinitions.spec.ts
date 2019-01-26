import { NoteBlockType, noteBlockDefinitionMap } from './noteBlockDefinitions';
import createNoteBlockDefinitions from './createNoteBlockDefinitions';
import { UUID_REGEX } from '../testUtils';

describe('The createNoteBlockDefinitions() function', () => {
  it('assigns a uuid ID to the created note by default', () => {
    const noteBlockDefinitions = createNoteBlockDefinitions(NoteBlockType.QUARTER_NOTE);
    expect(noteBlockDefinitions[0].id).toMatch(UUID_REGEX);
  });

  it('accepts a custom function for creating the noteBlockDefinition ID', () => {
    const noteBlockDefinitions = createNoteBlockDefinitions(
      NoteBlockType.QUARTER_NOTE,
      noteBlockDefinition => `foo-${noteBlockDefinition.alt}`,
    );

    expect(noteBlockDefinitions[0].id).toMatch('foo-Quarter note');
  });

  it('creates a single note block definition from a NoteBlockType', () => {
    const noteBlockDefinitions = createNoteBlockDefinitions(NoteBlockType.QUARTER_NOTE, () => {});
    expect(noteBlockDefinitions[0]).toEqual(noteBlockDefinitionMap[NoteBlockType.QUARTER_NOTE]);
  });

  it('creates multiple note block definitions from multiple NoteBlockTypes', () => {
    const noteBlockDefinitions = createNoteBlockDefinitions(
      [NoteBlockType.QUARTER_NOTE, NoteBlockType.HALF_NOTE],
      () => {},
    );

    expect(noteBlockDefinitions).toEqual([
      noteBlockDefinitionMap[NoteBlockType.QUARTER_NOTE],
      noteBlockDefinitionMap[NoteBlockType.HALF_NOTE],
    ]);
  });
});
