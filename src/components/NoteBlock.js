import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { dropTypes } from '../lib/constants';
import { note } from '../lib/commonPropTypes';
import styles from './NoteBlock.module.css';

const propTypes = {
  className: PropTypes.string,
  isPaletteNote: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  measureIndex: PropTypes.number,
  onNoteRemove: PropTypes.func,
  ...note,
};

const defaultProps = {
  isPaletteNote: false,
  measureIndex: null,
  onNoteRemove: null,
};

const NoteBlock = ({ className, css, svg, alt, connectDragSource }) => {
  return connectDragSource(
    <div className={`${styles.note} ${styles[css]} ${className}`}>
      <img src={svg} alt={alt} />
    </div>,
  );
};

NoteBlock.propTypes = propTypes;
NoteBlock.defaultProps = defaultProps;

const dragSpec = {
  beginDrag: props => {
    return {
      noteType: props.type,
      noteDuration: props.duration,
    };
  },

  endDrag: ({ isPaletteNote, measureIndex, id, onNoteRemove }, monitor) => {
    if (onNoteRemove && !isPaletteNote) {
      onNoteRemove(measureIndex, id);
    }
  },
};

const dragCollect = connect => {
  return {
    connectDragSource: connect.dragSource(),
  };
};

export default DragSource(
  ({ isPaletteNote }) => (isPaletteNote ? dropTypes.PALETTE_NOTE_BLOCK : dropTypes.NOTE_BLOCK),
  dragSpec,
  dragCollect,
)(NoteBlock);
