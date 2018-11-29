import { noteBlockMap } from './noteBlocks';
import uuid from 'uuid/v4';

const lookupNoteBlock = noteBlockType => {
  return noteBlockMap[noteBlockType];
};

const createNoteBlocks = (noteBlockTypes, noteBlockIdFunction = () => uuid()) => {
  return [].concat(noteBlockTypes).map(type => {
    const noteBlock = lookupNoteBlock(type);
    const id = noteBlockIdFunction(noteBlock);
    return { id, ...noteBlock };
  });
};

export default createNoteBlocks;
