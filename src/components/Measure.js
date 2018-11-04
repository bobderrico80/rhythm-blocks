import React from 'react';
import NoteBlock from './NoteBlock';
import styles from './Measure.module.css';
import createNotes from '../lib/createNotes';
import { noteDropActionTypes } from '../lib/constants';

class Measure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beats: [],
      totalDuration: [],
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

  static getDerivedStateFromProps(props) {
    const { notes } = props;
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

    return { totalDuration, beats };
  }

  onDrop(event) {
    event.preventDefault();

    const noteDragAction = JSON.parse(event.dataTransfer.getData('text/plain'));
    console.log('noteDragAction', typeof noteDragAction, noteDragAction);

    if (noteDragAction.type !== noteDropActionTypes.ADD_TO_MEASURE) {
      return;
    }

    const { totalDuration } = this.state;
    const { notes, index, beatsPerMeasure } = this.props;

    const [note] = createNotes(noteDragAction.payload.noteCode);

    if (totalDuration + note.duration > beatsPerMeasure) {
      console.log('too many beats!');
      return;
    }

    this.props.onUpdate(previousMeasures => {
      const newMeasures = [...previousMeasures];

      newMeasures[index] = [...notes, note];

      return newMeasures;
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
        {this.props.notes.map((note, index) => (
          <NoteBlock
            key={`${this.state.beats[index]}-${note.id}`}
            noteDropActionType={noteDropActionTypes.REMOVE_FROM_MEASURE}
            index={index}
            measureIndex={this.props.index}
            {...note}
          />
        ))}
      </div>
    );
  }
}

export default Measure;
