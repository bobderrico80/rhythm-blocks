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
  showAddButton: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  onDropNote: PropTypes.func.isRequired,
  onNoteRemove: PropTypes.func.isRequired,
  onMeasureAdd: PropTypes.func.isRequired,
  onMeasureRemove: PropTypes.func.isRequired,
};

const defaultProps = {
  notes: [],
  totalDuration: 0,
  showAddButton: false,
  showRemoveButton: false,
};

const Measure = ({
  index,
  notes,
  connectDropTarget,
  showAddButton,
  showRemoveButton,
  onNoteRemove,
  onMeasureAdd,
  onMeasureRemove,
}) => {
  return connectDropTarget(
    <div className={styles.measureWrap}>
      <div className={styles.measure}>
        {notes.map((note, noteIndex) => (
          <NoteBlock
            key={note.id}
            index={noteIndex}
            measureIndex={index}
            onNoteRemove={onNoteRemove}
            {...note}
          />
        ))}
      </div>
      {showAddButton ? (
        <button className={styles.addButton} onClick={onMeasureAdd}>
          Add Measure
        </button>
      ) : null}
      {showRemoveButton ? (
        <button className={styles.removeButton} onClick={() => onMeasureRemove(index)}>
          Remove Measure
        </button>
      ) : null}
    </div>,
  );
};

Measure.propTypes = propTypes;
Measure.defaultProps = defaultProps;

const dropSpec = {
  drop: ({ index, onDropNote, totalDuration, beatsPerMeasure }, monitor) => {
    const { noteType, noteDuration } = monitor.getItem();

    // Cancel drop if measure is full or will be full
    if (totalDuration === beatsPerMeasure || totalDuration + noteDuration > beatsPerMeasure) {
      return;
    }

    onDropNote({
      measureIndex: index,
      noteType,
    });
  },
};

const dropCollect = connect => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
};

export default DropTarget(
  [dropTypes.NOTE_BLOCK, dropTypes.PALETTE_NOTE_BLOCK],
  dropSpec,
  dropCollect,
)(Measure);
