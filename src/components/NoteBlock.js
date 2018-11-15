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
  ...note,
};

const defaultProps = {
  isPaletteNote: false,
};

class NoteBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, css, svg, alt, connectDragSource } = this.props;

    return connectDragSource(
      <div className={`${styles.note} ${styles[css]} ${className}`}>
        <img src={svg} alt={alt} />
      </div>,
    );
  }
}

NoteBlock.propTypes = propTypes;
NoteBlock.defaultProps = defaultProps;

const dragSpec = {
  beginDrag: (props, monitor, component) => {
    return {
      noteId: props.id,
      noteType: props.type,
    };
  },
};

const dragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
  };
};

export default DragSource(
  ({ isPaletteNote }) => (isPaletteNote ? dropTypes.PALETTE_NOTE_BLOCK : dropTypes.NOTE_BLOCK),
  dragSpec,
  dragCollect,
)(NoteBlock);
