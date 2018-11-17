const createMeasures = (...beatsPerMeasures) => {
  return beatsPerMeasures.map(beatsPerMeasure => ({
    totalDuration: 0,
    notes: [],
    beatsPerMeasure,
  }));
};

export default createMeasures;
