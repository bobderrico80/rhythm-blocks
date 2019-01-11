import { noteBlockDefinitionMap, NoteBlockDefinition, NoteBlockType } from './noteBlockDefinitions';
import uuid from 'uuid/v4';

const lookupNoteBlockDefinition = (noteBlockType: NoteBlockType): NoteBlockDefinition => {
  return noteBlockDefinitionMap[noteBlockType];
};

const createNoteBlockDefinitions = (
  noteBlockTypes: NoteBlockType | NoteBlockType[],
  noteBlockIdFunction: (noteBlock: NoteBlockDefinition) => any = () => uuid(),
): NoteBlockDefinition[] => {
  return Array.prototype.concat(noteBlockTypes).map(type => {
    const noteBlock = lookupNoteBlockDefinition(type);
    const id = noteBlockIdFunction(noteBlock);
    return { id, ...noteBlock };
  });
};

export default createNoteBlockDefinitions;
