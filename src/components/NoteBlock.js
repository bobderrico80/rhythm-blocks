import React from 'react';
import styles from './NoteBlock.module.css';

class NoteBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onDragStart = this.onDragStart.bind(this);
  }

  onDragStart(noteCode, event) {
    event.dataTransfer.setData('text/plain', noteCode);
  }

  render() {
    const { className, css, svg, alt, id } = this.props;

    return (
      <div
        className={`${styles.note} ${styles[css]} ${className}`}
        draggable
        onDragStart={event => this.onDragStart(id, event)}
      >
        <img src={svg} alt={alt} />
      </div>
    );
  }
}

export default NoteBlock;
