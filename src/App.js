import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Measure from './components/Measure';
import NoteBlockPalette from './components/NoteBlockPalette';
import Player from './components/Player';
import createMeasures from './lib/createMeasures';
import createNoteBlocks from './lib/createNoteBlocks';
import { noteBlockTypes } from './lib/constants';
import styles from './App.module.css';

const BEATS_PER_MEASURE = 4;
const MAX_MEASURES = 4;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };

    this.onMeasureDropNoteBlock = this.onMeasureDropNoteBlock.bind(this);
    this.onNoteBlockRemove = this.onNoteBlockRemove.bind(this);
    this.onMeasureAdd = this.onMeasureAdd.bind(this);
    this.onMeasureRemove = this.onMeasureRemove.bind(this);
  }

  static calculateTotalDuration(measureNoteBlocks) {
    return measureNoteBlocks.reduce(
      (totalDuration, noteBlock) => (totalDuration += noteBlock.duration),
      0,
    );
  }

  updateMeasure(measureIndex, updateMeasureNoteBlockFunction) {
    this.setState(({ measures }) => {
      const previousMeasure = measures[measureIndex];
      const updatedMeasures = [...measures];
      const updatedMeasureNoteBlocks = updateMeasureNoteBlockFunction(previousMeasure.noteBlocks);

      updatedMeasures[measureIndex] = {
        ...previousMeasure,
        noteBlocks: updatedMeasureNoteBlocks,
        totalDuration: App.calculateTotalDuration(updatedMeasureNoteBlocks),
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

  onMeasureDropNoteBlock({ measureIndex, noteBlockType }) {
    this.addNoteBlockToMeasure(measureIndex, noteBlockType);
  }

  onNoteBlockRemove(measureIndex, noteBlockId) {
    this.removeNoteBlockFromMeasure(measureIndex, noteBlockId);
  }

  onMeasureAdd() {
    this.setState(({ measures }) => ({
      measures: measures.concat(createMeasures(BEATS_PER_MEASURE)),
    }));
  }

  onMeasureRemove(measureIndex) {
    this.setState(({ measures }) => ({
      measures: [...measures.slice(0, measureIndex), ...measures.slice(measureIndex + 1)],
    }));
  }

  render() {
    return (
      <div className={styles.app}>
        <section>
          <Player measures={this.state.measures} />
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
          />
        </section>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
