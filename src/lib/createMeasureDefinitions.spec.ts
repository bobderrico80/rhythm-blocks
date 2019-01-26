import createMeasureDefinitions from './createMeasureDefinitions';

describe('The createMeasureDefinitions function', () => {
  it('returns a single MeasureDefinition with the specified number of beats', () => {
    const measureDefinitions = createMeasureDefinitions(4);
    expect(measureDefinitions[0]).toEqual({
      totalDuration: 0,
      noteBlocks: [],
      beatsPerMeasure: 4,
    });
  });

  it('returns multiple MeasureDefinition objects with the specified number of beats', () => {
    const measureDefinitions = createMeasureDefinitions(4, 3);
    expect(measureDefinitions.map(({ beatsPerMeasure }) => beatsPerMeasure)).toEqual([4, 3]);
  });
});
