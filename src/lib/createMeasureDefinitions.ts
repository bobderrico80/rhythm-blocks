import { NoteBlockDefinition } from './noteBlockDefinitions';

export interface MeasureDefinition {
  totalDuration: number;
  noteBlocks: NoteBlockDefinition[];
  beatsPerMeasure: number;
}

const createMeasureDefinitions = (...beatsPerMeasures: number[]): MeasureDefinition[] => {
  return beatsPerMeasures.map(beatsPerMeasure => ({
    totalDuration: 0,
    noteBlocks: [],
    beatsPerMeasure,
  }));
};

export default createMeasureDefinitions;
