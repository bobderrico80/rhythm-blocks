import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import NoteBlock from './NoteBlock';
import styles from './Measure.module.css';
import { note } from '../lib/commonPropTypes';
import { dropTypes } from '../lib/constants';

const propTypes = {
  index: PropTypes.number.isRequired,
  beatsPerMeasure: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape(note)),
  connectDropTarget: PropTypes.func.isRequired,
  onDropNote: PropTypes.func.isRequired,
};

const defaultProps = {
  notes: [],
  totalDuration: 0,
};

class Measure extends React.Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={styles.measure}>
        {this.props.notes.map((note, index) => (
          <NoteBlock key={note.id} index={index} measureIndex={this.props.index} {...note} />
        ))}
      </div>,
    );
  }
}

Measure.propTypes = propTypes;
Measure.defaultProps = defaultProps;

const dropSpec = {
  drop: ({ index, onDropNote, totalDuration, beatsPerMeasure }, monitor, component) => {
    // Cancel drop if measure is full
    if (totalDuration === beatsPerMeasure) {
      return;
    }

    const { noteId, noteType } = monitor.getItem();
    onDropNote({ measureIndex: index, dropType: monitor.getItemType(), noteId, noteType });
  },
};

const dropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
};

export default DropTarget(
  [dropTypes.NOTE_BLOCK, dropTypes.PALETTE_NOTE_BLOCK],
  dropSpec,
  dropCollect,
)(Measure);
