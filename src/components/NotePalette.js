import React from 'react';
import PropTypes from 'prop-types';
import NoteBlock from './NoteBlock';
import styles from './NotePalette.module.css';
import createNotes from '../lib/createNotes';
import { noteDropActionTypes, noteIds } from '../lib/constants';

const propTypes = {
  className: PropTypes.string,
  paletteNoteIds: PropTypes.arrayOf(PropTypes.oneOf(Object.values(noteIds))).isRequired,
};

const defaultProps = {
  className: '',
};

class NotePalette extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notes = createNotes(...this.props.paletteNoteIds);

    return (
      <div className={styles.notePalette}>
        {notes.map(note => {
          return (
            <NoteBlock className={styles.notePaletteNote} key={`palette-${note.css}`} {...note} />
          );
        })}
      </div>
    );
  }
}

NotePalette.propTypes = propTypes;
NotePalette.defaultProps = defaultProps;

export default NotePalette;
