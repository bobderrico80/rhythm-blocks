import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { dropTypes } from '../lib/constants';
import { noteBlock } from '../lib/commonPropTypes';
import styles from './NoteBlock.module.css';

const propTypes = {
  className: PropTypes.string,
  isPaletteNoteBlock: PropTypes.bool,
  isComposerPlaying: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  measureIndex: PropTypes.number,
  onNoteBlockRemove: PropTypes.func,
  ...noteBlock,
};

const defaultProps = {
  isPaletteNoteBlock: false,
  measureIndex: null,
  onNoteRemove: null,
};

const NoteBlock = ({ className, css, svg, alt, connectDragSource }) => {
  return connectDragSource(
    <div className={`${styles['note-block']} ${styles[css]} ${className}`}>
      <img src={svg} alt={alt} />
    </div>,
  );
};

NoteBlock.propTypes = propTypes;
NoteBlock.defaultProps = defaultProps;

const dragSpec = {
  beginDrag: props => {
    return {
      noteBlockType: props.type,
      noteBlockDuration: props.duration,
    };
  },

  canDrag: props => !props.isComposerPlaying,

  endDrag: ({ isPaletteNoteBlock, measureIndex, id, onNoteBlockRemove }, monitor) => {
    if (onNoteBlockRemove && !isPaletteNoteBlock) {
      onNoteBlockRemove(measureIndex, id);
    }
  },
};

const dragCollect = connect => {
  return {
    connectDragSource: connect.dragSource(),
  };
};

export default DragSource(
  ({ isPaletteNoteBlock }) =>
    isPaletteNoteBlock ? dropTypes.PALETTE_NOTE_BLOCK : dropTypes.NOTE_BLOCK,
  dragSpec,
  dragCollect,
)(NoteBlock);
