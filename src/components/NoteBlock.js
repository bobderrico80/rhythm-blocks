import React from 'react';
import styles from './NoteBlock.module.css';

class NoteBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onDragStart = this.onDragStart.bind(this);
  }

  onDragStart(event) {
    const noteDragAction = {
      type: this.props.noteDropActionType,
      payload: {
        noteCode: this.props.id,
        index: this.props.index,
        measureIndex: this.props.measureIndex,
      },
    };
    console.log('noteDragAction', typeof noteDragAction, noteDragAction);

    event.dataTransfer.setData('text/plain', JSON.stringify(noteDragAction));
  }

  render() {
    const { className, css, svg, alt } = this.props;

    return (
      <div
        className={`${styles.note} ${styles[css]} ${className}`}
        draggable
        onDragStart={this.onDragStart}
      >
        <img src={svg} alt={alt} />
      </div>
    );
  }
}

export default NoteBlock;
