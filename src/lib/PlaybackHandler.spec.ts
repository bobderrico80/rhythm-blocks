import Tone, { Transport, Master } from 'tone';
import PlaybackHandler from './PlaybackHandler';
import createMeasureDefinitions from './createMeasureDefinitions';
import createNoteBlockDefinitions from './createNoteBlockDefinitions';
import { NoteBlockType } from './noteBlockDefinitions';

jest.mock('tone');

describe('The PlaybackHandler class', () => {
  let playbackHandler: PlaybackHandler;
  let synth: Master;

  beforeEach(() => {
    synth = {
      triggerAttackRelease: jest.fn(),
    };

    jest.spyOn(Tone, 'Synth').mockImplementation(() => {
      return {
        toMaster: jest.fn().mockImplementation(() => synth),
      };
    });

    playbackHandler = new PlaybackHandler();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('startPlayback() method calls Transport.start()', () => {
    const startSpy = jest.spyOn(Transport, 'start');
    playbackHandler.startPlayback();
    expect(startSpy).toHaveBeenCalled();
  });

  it('stopPlayback() method calls Transport.stop()', () => {
    const stopSpy = jest.spyOn(Transport, 'stop');
    playbackHandler.stopPlayback();
    expect(stopSpy).toHaveBeenCalled();
  });

  describe('init() method', () => {
    let onSpy = jest.spyOn(Transport, 'on');

    beforeEach(() => {
      jest.spyOn(Transport, 'on');
      playbackHandler.init();
    });

    it('initializes the master synth', () => {
      expect(playbackHandler.synth).toEqual(synth);
    });

    it('sets initialized to true', () => {
      expect(playbackHandler.initialized).toEqual(true);
    });

    it('adds a transport start listener', () => {
      expect(onSpy).toHaveBeenCalledWith('start', expect.any(Function));
    });

    it('adds a transport stop listener', () => {
      expect(onSpy).toHaveBeenCalledWith('stop', expect.any(Function));
    });
  });

  describe('triggerNote() method', () => {
    const mockDuration = 100;

    let triggerAttackReleaseSpy: jest.SpyInstance;
    let calledPitch: string;
    let calledDuration: number;
    let calledTime: number;

    beforeEach(() => {
      jest.spyOn(Tone, 'Time').mockImplementation(() => ({ valueOf: () => mockDuration }));
      triggerAttackReleaseSpy = jest.spyOn(synth, 'triggerAttackRelease');

      playbackHandler.triggerNote('1n')(42);

      [calledPitch, calledDuration, calledTime] = triggerAttackReleaseSpy.mock.calls[0];
    });

    it('triggers the note with the default note pitch', () => {
      expect(calledPitch).toEqual('F4');
    });

    it('triggers the note with the expected duration, with the note spacing percentage applied', () => {
      expect(calledDuration).toEqual(85);
    });

    it('triggers the note with the expected time value', () => {
      expect(calledTime).toEqual(42);
    });
  });

  describe('scheduleMeasures() method', () => {
    /**
     * Helper function to setup necessary spies and schedule 1 measures-worth of notes.
     * @param {[NoteBlockType[] = []]} measureNotesToSchedule An array of NoteBlockTypes to
     * schedule.
     */
    const setupAndTriggerScheduleMeasuresTest = (measureNotesToSchedule: NoteBlockType[] = []) => {
      jest.spyOn(Tone, 'Time').mockImplementation(() => ({ toSeconds: () => 1 }));
      const cancelSpy = jest.spyOn(Transport, 'cancel');
      const scheduleSpy = jest.spyOn(Transport, 'schedule');

      const measuresToSchedule = createMeasureDefinitions(4);
      measuresToSchedule[0].noteBlocks = createNoteBlockDefinitions(measureNotesToSchedule);
      measuresToSchedule[0].totalDuration = 4;

      playbackHandler.scheduleMeasures(measuresToSchedule);

      return { cancelSpy, scheduleSpy };
    };

    let measureNotesToSchedule: NoteBlockType[];

    it('cancels Transport before scheduling', () => {
      const { cancelSpy } = setupAndTriggerScheduleMeasuresTest();
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });

    describe('typical Transport.schedule() calling behavior', () => {
      // A measure with 4 quarter notes at 60 bpm (1 beat/note per second)
      beforeEach(() => {
        measureNotesToSchedule = [
          NoteBlockType.QUARTER_NOTE,
          NoteBlockType.QUARTER_NOTE,
          NoteBlockType.QUARTER_NOTE,
          NoteBlockType.QUARTER_NOTE,
        ];
      });

      it('calls for each note pattern note, plus one time to schedule the end of playback', () => {
        const { scheduleSpy } = setupAndTriggerScheduleMeasuresTest(measureNotesToSchedule);
        expect(scheduleSpy).toHaveBeenCalledTimes(5);
      });

      describe('on calls for each note', () => {
        it('calls with the time function returned by this.triggerNote', () => {
          const triggerNoteFn = jest.fn();
          jest.spyOn(playbackHandler, 'triggerNote').mockImplementation(() => triggerNoteFn);

          const { scheduleSpy } = setupAndTriggerScheduleMeasuresTest(measureNotesToSchedule);
          [1, 2, 3, 4].forEach(callNumber =>
            expect(scheduleSpy).toHaveBeenNthCalledWith(
              callNumber,
              triggerNoteFn,
              expect.any(Number),
            ),
          );
        });

        it('calls with the elapsed time', () => {
          const { scheduleSpy } = setupAndTriggerScheduleMeasuresTest(measureNotesToSchedule);
          // Each note is mocked to return 1 second
          // First call, 0 seconds have elapsed, second call 1 second, etc.
          [1, 2, 3, 4].forEach(callNumber =>
            expect(scheduleSpy).toHaveBeenNthCalledWith(
              callNumber,
              expect.any(Function),
              callNumber - 1,
            ),
          );
        });
      });

      describe('on final call', () => {
        it('calls with a bound this.stopPlayback() function', () => {
          const boundStopPlaybackFn = jest.fn();
          playbackHandler.stopPlayback.bind = () => boundStopPlaybackFn;

          const { scheduleSpy } = setupAndTriggerScheduleMeasuresTest(measureNotesToSchedule);
          expect(scheduleSpy).toHaveBeenLastCalledWith(boundStopPlaybackFn, expect.any(Number));
        });

        it('calls with the total elapsed time, plus 1 second of trailing time', () => {
          const { scheduleSpy } = setupAndTriggerScheduleMeasuresTest(measureNotesToSchedule);
          expect(scheduleSpy).toHaveBeenLastCalledWith(expect.any(Function), 5);
        });
      });
    });

    describe('on measures with a rest', () => {
      // A measure with 2 quarter notes, a quarter rest, and an additional quarter note
      beforeEach(() => {
        measureNotesToSchedule = [
          NoteBlockType.QUARTER_NOTE,
          NoteBlockType.QUARTER_NOTE,
          NoteBlockType.QUARTER_REST,
          NoteBlockType.QUARTER_NOTE,
        ];
      });

      it('does not call Transport.schedule() for rests', () => {
        const { scheduleSpy } = setupAndTriggerScheduleMeasuresTest(measureNotesToSchedule);
        expect(scheduleSpy).toHaveBeenCalledTimes(4);
      });

      it('still includes rest time in elapsed time', () => {
        const { scheduleSpy } = setupAndTriggerScheduleMeasuresTest(measureNotesToSchedule);
        expect(scheduleSpy).toHaveBeenLastCalledWith(expect.any(Function), 5);
      });
    });

    describe('on measures with no notes', () => {
      it('only calls Transport.schedule() with trailing time', () => {
        const { scheduleSpy } = setupAndTriggerScheduleMeasuresTest();
        expect(scheduleSpy).toHaveBeenLastCalledWith(expect.any(Function), 1);
      });
    });

    describe('on no measures', () => {
      it('never calls Transport.schedule()', () => {
        const scheduleSpy = jest.spyOn(Transport, 'schedule');
        playbackHandler.scheduleMeasures([]);

        expect(scheduleSpy).not.toHaveBeenCalled();
      });
    });
  });
});
