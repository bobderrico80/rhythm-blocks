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

  render() {
    return (
      <div
        className={styles.measure}
      >
        {this.props.notes.map((note, index) => (
          <NoteBlock
            key={`${this.state.beats[index]}-${note.id}`}
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
