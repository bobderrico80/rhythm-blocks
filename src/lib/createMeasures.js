const createMeasures = (...beatsPerMeasures) => {
  return beatsPerMeasures.map(beatsPerMeasure => ({
    totalDuration: 0,
    noteBlocks: [],
    beatsPerMeasure,
  }));
};

export default createMeasures;
