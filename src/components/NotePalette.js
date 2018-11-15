import React from 'react';
import PropTypes from 'prop-types';
import NoteBlock from './NoteBlock';
import styles from './NotePalette.module.css';
import { note } from '../lib/commonPropTypes';

const propTypes = {
  paletteNotes: PropTypes.arrayOf(PropTypes.shape(note)).isRequired,
};

const defaultProps = {
  className: '',
};

const NotePalette = ({ paletteNotes }) => {
  return (
    <div className={styles.notePalette}>
      {paletteNotes.map(note => {
        return (
          <NoteBlock
            className={styles.notePaletteNote}
            key={note.id}
            {...note}
            isPaletteNote={true}
          />
        );
      })}
    </div>
  );
};

NotePalette.propTypes = propTypes;
NotePalette.defaultProps = defaultProps;

export default NotePalette;
