import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import NoteBlock from './NoteBlock';
import { noteBlock } from '../lib/commonPropTypes';
import { dropTypes } from '../lib/constants';
import plus from '../assets/svg/plus.svg';
import close from '../assets/svg/close.svg';
import styles from './Measure.module.css';

const propTypes = {
  index: PropTypes.number.isRequired,
  beatsPerMeasure: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  noteBlocks: PropTypes.arrayOf(PropTypes.shape(noteBlock)),
  connectDropTarget: PropTypes.func.isRequired,
  showAddButton: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  onDropNoteBlock: PropTypes.func.isRequired,
  onNoteBlockRemove: PropTypes.func.isRequired,
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
  noteBlocks,
  connectDropTarget,
  showAddButton,
  showRemoveButton,
  onNoteBlockRemove,
  onMeasureAdd,
  onMeasureRemove,
}) => {
  return connectDropTarget(
    <div className={styles.measureWrap}>
      <div className={styles.measure}>
        {noteBlocks.map((noteBlock, noteIndex) => (
          <NoteBlock
            key={noteBlock.id}
            index={noteIndex}
            measureIndex={index}
            onNoteBlockRemove={onNoteBlockRemove}
            {...noteBlock}
          />
        ))}
      </div>
      {showRemoveButton ? (
        <button className={styles.removeButton} onClick={() => onMeasureRemove(index)}>
          <img className={styles.removeButtonIcon} src={close} alt="Remove Measure" />
        </button>
      ) : null}
      {showAddButton ? (
        <button className={styles.addButton} onClick={onMeasureAdd}>
          <img className={styles.addButtonIcon} src={plus} alt="Add Measure" />
        </button>
      ) : null}
    </div>,
  );
};

Measure.propTypes = propTypes;
Measure.defaultProps = defaultProps;

const dropSpec = {
  drop: ({ index, onDropNoteBlock, totalDuration, beatsPerMeasure }, monitor) => {
    const { noteBlockType, noteBlockDuration } = monitor.getItem();

    // Cancel drop if measure is full or will be full
    if (totalDuration === beatsPerMeasure || totalDuration + noteBlockDuration > beatsPerMeasure) {
      return;
    }

    onDropNoteBlock({
      measureIndex: index,
      noteBlockType,
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
