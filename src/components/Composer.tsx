import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Measure from './Measure';
import NoteBlockPalette from './NoteBlockPalette';
import Player from './Player';
import createMeasureDefinitions, { MeasureDefinition } from '../lib/createMeasureDefinitions';
import createNoteBlockDefinitions from '../lib/createNoteBlockDefinitions';
import isTouchDevice from '../lib/isTouchDevice';
import styles from './Composer.module.css';
import { NoteBlockDefinition, NoteBlockType } from '../lib/noteBlockDefinitions';
import PlaybackState from '../lib/PlaybackState';

const BEATS_PER_MEASURE = 4;
const MAX_MEASURES = 4;

interface ComposerState {
  paletteNoteBlocks: NoteBlockDefinition[];
  measures: MeasureDefinition[];
  playbackState: PlaybackState;
}

class Composer extends Component {
  static calculateTotalDuration(measureNoteBlocks: NoteBlockDefinition[]) {
    return measureNoteBlocks.reduce(
      (totalDuration, noteBlock) => (totalDuration += noteBlock.duration),
      0,
    );
  }

  state: ComposerState = {
    paletteNoteBlocks: createNoteBlockDefinitions(
      [
        NoteBlockType.WHOLE_NOTE,
        NoteBlockType.HALF_NOTE,
        NoteBlockType.QUARTER_NOTE,
        NoteBlockType.DOUBLE_8TH_NOTES,
        NoteBlockType.FOUR_BEAMED_16TH_NOTES,
        NoteBlockType.QUARTER_REST,
      ],
      noteBlock => `palette-${noteBlock.type}`,
    ),
    measures: createMeasureDefinitions(BEATS_PER_MEASURE),
    playbackState: PlaybackState.STOPPED,
  };

  onMeasureDropNoteBlock = ({
    measureIndex,
    noteBlockType,
  }: {
    measureIndex: number;
    noteBlockType: NoteBlockType;
  }) => {
    this.addNoteBlockToMeasure(measureIndex, noteBlockType);
  };

  onNoteBlockRemove = (measureIndex: number, noteBlockId?: string) => {
    this.removeNoteBlockFromMeasure(measureIndex, noteBlockId);
  };

  onMeasureAdd = () => {
    this.setState(({ measures }: { measures: MeasureDefinition[] }) => ({
      // TODO: Measure type
      measures: measures.concat(createMeasureDefinitions(BEATS_PER_MEASURE)),
    }));
  };

  onMeasureRemove = (measureIndex: number) => {
    this.setState(({ measures }: { measures: MeasureDefinition[] }) => ({
      // TODO: Measure type
      measures: [...measures.slice(0, measureIndex), ...measures.slice(measureIndex + 1)],
    }));
  };

  onPlaybackStateChange = (nextPlaybackState: PlaybackState) => {
    this.setState({ playbackState: nextPlaybackState });
  };

  updateMeasure(
    measureIndex: number,
    updateMeasureNoteBlockFunction: (
      previousNoteBlocks: NoteBlockDefinition[],
    ) => NoteBlockDefinition[],
  ) {
    this.setState(({ measures }: { measures: MeasureDefinition[] }) => {
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

  addNoteBlockToMeasure(measureIndex: number, noteBlockType: NoteBlockType) {
    const newNoteBlock = createNoteBlockDefinitions(noteBlockType);

    this.updateMeasure(measureIndex, previousMeasureNoteBlocks => [
      ...previousMeasureNoteBlocks,
      ...newNoteBlock,
    ]);
  }

  removeNoteBlockFromMeasure(measureIndex: number, noteBlockId?: string) {
    this.updateMeasure(measureIndex, previousMeasureNoteBlocks =>
      previousMeasureNoteBlocks.filter(noteBlock => noteBlock.id !== noteBlockId),
    );
  }

  isPlaying() {
    return this.state.playbackState === PlaybackState.PLAYING;
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
            paletteNoteBlocks={this.state.paletteNoteBlocks}
            isComposerPlaying={this.isPlaying()}
          />
        </section>
      </main>
    );
  }
}

export default DragDropContext(HTML5Backend)(Composer);
