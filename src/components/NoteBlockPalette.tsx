import React from 'react';
import NoteBlock from './NoteBlock';
import styles from './NoteBlockPalette.module.css';
import { NoteBlockDefinition } from '../lib/noteBlockDefinitions';

interface NoteBlockPaletteProps {
  paletteNoteBlocks: NoteBlockDefinition[];
  isComposerPlaying: boolean;
}

const NoteBlockPalette = ({ paletteNoteBlocks, isComposerPlaying }: NoteBlockPaletteProps) => {
  return (
    <div className={styles.notePalette}>
      {paletteNoteBlocks.map(noteBlock => {
        return (
          <NoteBlock
            className={styles.notePaletteNoteBlock}
            key={noteBlock.id}
            noteBlockDefinition={noteBlock}
            isPaletteNoteBlock={true}
            isComposerPlaying={isComposerPlaying}
          />
        );
      })}
    </div>
  );
};

export default NoteBlockPalette;
