import { noteMap } from './notes';
import uuid from 'uuid/v4';

const lookupNote = noteType => {
  return noteMap[noteType];
};

const createNotes = (noteTypes, noteIdFunction = () => uuid()) => {
  return [].concat(noteTypes).map(type => {
    const note = lookupNote(type);
    const id = noteIdFunction(note);
    return { id, ...note };
  });
};

export default createNotes;
