import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Measure from './Measure';
import NoteBlockPalette from './NoteBlockPalette';
import Player from './Player';
import createMeasures from '../lib/createMeasures';
import createNoteBlocks from '../lib/createNoteBlocks';
import { noteBlockTypes, playbackStates } from '../lib/constants';
import isTouchDevice from '../lib/isTouchDevice';
import styles from './Composer.module.css';

const BEATS_PER_MEASURE = 4;
const MAX_MEASURES = 4;

class Composer extends Component {
  static calculateTotalDuration(measureNoteBlocks) {
    return measureNoteBlocks.reduce(
      (totalDuration, noteBlock) => (totalDuration += noteBlock.duration),
      0,
    );
  }

  state = {
    paletteNoteBlocks: createNoteBlocks(
      [
        noteBlockTypes.WHOLE_NOTE,
        noteBlockTypes.HALF_NOTE,
        noteBlockTypes.QUARTER_NOTE,
        noteBlockTypes.DOUBLE_8TH_NOTES,
        noteBlockTypes.QUARTER_NOTE_REST,
      ],
      noteBlock => `palette-${noteBlock.type.description}`,
    ),
    measures: createMeasures(BEATS_PER_MEASURE),
    playbackState: playbackStates.STOPPED,
  };

  onMeasureDropNoteBlock = ({ measureIndex, noteBlockType }) => {
    this.addNoteBlockToMeasure(measureIndex, noteBlockType);
  };

  onNoteBlockRemove = (measureIndex, noteBlockId) => {
    this.removeNoteBlockFromMeasure(measureIndex, noteBlockId);
  };

  onMeasureAdd = () => {
    this.setState(({ measures }) => ({
      measures: measures.concat(createMeasures(BEATS_PER_MEASURE)),
    }));
  };

  onMeasureRemove = measureIndex => {
    this.setState(({ measures }) => ({
      measures: [...measures.slice(0, measureIndex), ...measures.slice(measureIndex + 1)],
    }));
  };

  onPlaybackStateChange = nextPlaybackState => {
    this.setState({ playbackState: nextPlaybackState });
  };

  updateMeasure(measureIndex, updateMeasureNoteBlockFunction) {
    this.setState(({ measures }) => {
      const previousMeasure = measures[measureIndex];
      const updatedMeasures = [...measures];
      const updatedMeasureNoteBlocks = updateMeasureNoteBlockFunction(previousMeasure.noteBlocks);

      updatedMeasures[measureIndex] = {
        ...previousMeasure,
        noteBlocks: updatedMeasureNoteBlocks,
        totalDuration: Composer.calculateTotalDuration(updatedMeasureNoteBlocks),
      };

      return { measures: updatedMeasures };
    });
  }

  addNoteBlockToMeasure(measureIndex, noteBlockType) {
    const newNoteBlock = createNoteBlocks(noteBlockType);

    this.updateMeasure(measureIndex, previousMeasureNoteBlocks => [
      ...previousMeasureNoteBlocks,
      ...newNoteBlock,
    ]);
  }

  removeNoteBlockFromMeasure(measureIndex, noteBlockId) {
    this.updateMeasure(measureIndex, previousMeasureNoteBlocks =>
      previousMeasureNoteBlocks.filter(noteBlock => noteBlock.id !== noteBlockId),
    );
  }

  isPlaying() {
    return this.state.playbackState === playbackStates.PLAYING;
  }

  render() {
    if (isTouchDevice()) {
      return (
        <main>
          Touch devices are not yet supported.{' '}
          <a
            href="https://github.com/bobderrico80/rhythm-blocks/milestone/2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support is coming soon!
          </a>
        </main>
      );
    }

    return (
      <main className={styles.composer}>
        <section className={styles.toolbar}>
          <Player
            measures={this.state.measures}
            playbackState={this.state.playbackState}
            onPlaybackStateChange={this.onPlaybackStateChange}
          />
        </section>
        <section className={styles.canvas}>
          {this.state.measures.map(({ noteBlocks, totalDuration, beatsPerMeasure }, index) => (
            <Measure
              key={index}
              index={index}
              beatsPerMeasure={beatsPerMeasure}
              totalDuration={totalDuration}
              noteBlocks={noteBlocks}
              showAddButton={
                this.state.measures.length < MAX_MEASURES &&
                index === this.state.measures.length - 1
              }
              showRemoveButton={this.state.measures.length > 1}
              isComposerPlaying={this.isPlaying()}
              onDropNoteBlock={this.onMeasureDropNoteBlock}
              onNoteBlockRemove={this.onNoteBlockRemove}
              onMeasureAdd={this.onMeasureAdd}
              onMeasureRemove={this.onMeasureRemove}
            />
          ))}
        </section>
        <section className={styles.palette}>
          <NoteBlockPalette
            className={styles.palette}
            paletteNoteBlocks={this.state.paletteNoteBlocks}
            isComposerPlaying={this.isPlaying()}
          />
        </section>
      </main>
    );
  }
}

export default DragDropContext(HTML5Backend)(Composer);
