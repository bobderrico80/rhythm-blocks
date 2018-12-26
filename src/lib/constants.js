export const dropTypes = {
  NOTE_BLOCK: Symbol('NOTE_BLOCK'),
  PALETTE_NOTE_BLOCK: Symbol('PALETTE_NOTE_BLOCK'),
};

export const noteBlockTypes = {
  WHOLE_NOTE: Symbol('WHOLE_NOTE'),
  HALF_NOTE: Symbol('HALF_NOTE'),
  QUARTER_NOTE: Symbol('QUARTER_NOTE'),
  DOUBLE_8TH_NOTES: Symbol('DOUBLE_8TH_NOTES'),
  QUARTER_NOTE_REST: Symbol('QUARTER_NOTE_REST'),
};

export const playbackStates = {
  STOPPED: Symbol('STOPPED'),
  PLAYING: Symbol('PLAYING'),
};
