import notes from './notes';

const lookupNote = noteId => {
  return notes[noteId];
};

const createNotes = (...noteIds) => {
  return noteIds.map(noteId => lookupNote(noteId));
};

export default createNotes;
