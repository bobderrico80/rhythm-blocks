import React from 'react';
import PropTypes from 'prop-types';
import NoteBlock from './NoteBlock';
import styles from './NotePalette.module.css';
import { note } from '../lib/commonPropTypes';

const propTypes = {
  className: PropTypes.string,
  paletteNotes: PropTypes.arrayOf(PropTypes.shape(note)).isRequired,
};

const defaultProps = {
  className: '',
};

class NotePalette extends React.Component {
  render() {
    return (
      <div className={styles.notePalette}>
        {this.props.paletteNotes.map(note => {
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
  }
}

NotePalette.propTypes = propTypes;
NotePalette.defaultProps = defaultProps;

export default NotePalette;
