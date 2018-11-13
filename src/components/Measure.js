import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import NoteBlock from './NoteBlock';
import styles from './Measure.module.css';
import createNotes from '../lib/createNotes';
import { dropTypes, noteIds } from '../lib/constants';

const propTypes = {
  index: PropTypes.number.isRequired,
  beatsPerMeasure: PropTypes.number.isRequired,
  noteIds: PropTypes.arrayOf(PropTypes.oneOf(Object.values(noteIds))),
  connectDropTarget: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
};

const defaultProps = {
  notes: [],
};

class Measure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      beats: [],
      totalDuration: [],
    };
  }

  static getDerivedStateFromProps(props) {
    const { noteIds } = props;
    const notes = createNotes(...noteIds);

    const totalDuration = notes.reduce(
      (previousDuration, note) => previousDuration + note.duration,
      0,
    );

    const beats = notes.reduce((previousBeats, note, index) => {
      if (index === 0) {
        return [0];
      }

      const previousIndex = index - 1;

      const nextBeat = previousBeats[previousIndex] + notes[previousIndex].duration;

      return [...previousBeats, nextBeat];
    }, []);

    return { notes, totalDuration, beats };
  }

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={styles.measure}>
        {this.state.notes.map((note, index) => (
          <NoteBlock
            key={`${this.state.beats[index]}-${note.css}`}
            index={index}
            measureIndex={this.props.index}
            {...note}
          />
        ))}
      </div>,
    );
  }
}

Measure.propTypes = propTypes;
Measure.defaultProps = defaultProps;

const dropSpec = {
  drop: ({ index, onAddNote }, monitor, component) => {
    onAddNote(index, monitor.getItem().noteId);
  },
};

const dropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
};

export default DropTarget(dropTypes.NOTE_BLOCK, dropSpec, dropCollect)(Measure);
