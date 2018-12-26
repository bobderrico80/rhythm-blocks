import React from 'react';
import PropTypes from 'prop-types';
import NoteBlock from './NoteBlock';
import styles from './NoteBlockPalette.module.css';
import { noteBlock } from '../lib/commonPropTypes';

const propTypes = {
  paletteNoteBlocks: PropTypes.arrayOf(PropTypes.shape(noteBlock)).isRequired,
  isComposerPlaying: PropTypes.bool.isRequired,
};

const defaultProps = {
  className: '',
};

const NoteBlockPalette = ({ paletteNoteBlocks, isComposerPlaying }) => {
  return (
    <div className={styles.notePalette}>
      {paletteNoteBlocks.map(noteBlock => {
        return (
          <NoteBlock
            className={styles.notePaletteNoteBlock}
            key={noteBlock.id}
            {...noteBlock}
            isPaletteNoteBlock={true}
            isComposerPlaying={isComposerPlaying}
          />
        );
      })}
    </div>
  );
};

NoteBlockPalette.propTypes = propTypes;
NoteBlockPalette.defaultProps = defaultProps;

export default NoteBlockPalette;
