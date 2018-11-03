import React from 'react';
import NoteBlock from './NoteBlock';
import styles from './Measure.module.css';
import createNotes from '../lib/createNotes';

class Measure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      beats: [],
      totalDuration: 0,
    };

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDragEnter(event) {
    event.preventDefault();
  }

  onDragOver(event) {
    event.preventDefault();
  }

  onDrop(event) {
    event.preventDefault();

    const noteCode = event.dataTransfer.getData('text/plain');
    const [note] = createNotes(noteCode);

    if (this.state.totalDuration + note.duration > this.props.beatsPerMeasure) {
      console.log('too many beats!');
      return;
    }

    this.setState(({ notes, beats, totalDuration }) => {
      const newDuration = totalDuration + note.duration;

      return {
        notes: [...notes, note],
        beats: [...beats, totalDuration],
        totalDuration: newDuration,
      };
    });
  }

  render() {
    return (
      <div
        className={styles.measure}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        {this.state.notes.map((note, index) => (
          <NoteBlock key={`${this.state.beats[index]}-${note.id}`} {...note} />
        ))}
      </div>
    );
  }
}

export default Measure;
