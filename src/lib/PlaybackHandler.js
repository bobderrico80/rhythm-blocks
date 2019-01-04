import Tone from 'tone';
import logger from './logger';

const NOTE_PITCH = 'F4';
const NOTE_SPACING = '16n';
const TRAILING_TIME_SECONDS = 1;

class PlaybackHander {
  initialized = false;
  synth = null;
  Transport = Tone.Transport;

  init() {
    if (!this.initialized) {
      logger.debug('Initializing playback');
      this.synth = new Tone.Synth().toMaster();
      this.initialized = true;

      this.Transport.on('start', () => {
        logger.debug('start');
      });

      this.Transport.on('stop', () => {
        logger.debug('stop');
      });
    }
  }

  startPlayback() {
    this.Transport.start();
  }

  stopPlayback() {
    this.Transport.stop();
  }

  triggerNote(duration) {
    if (!this.initialized) {
      this.init();
    }

    return time => {
      logger.debug(`triggering ${duration} at ${time}`);
      this.synth.triggerAttackRelease(
        NOTE_PITCH,
        Tone.Time(duration) - Tone.Time(NOTE_SPACING),
        time,
      );
    };
  }

  scheduleMeasures(measures) {
    if (!this.initialized) {
      this.init();
    }

    this.Transport.cancel();

    let elapsedTime = 0;

    if (measures.length === 0) {
      return;
    }

    measures.forEach(measure => {
      if (measure.length === 0) {
        return;
      }

      measure.noteBlocks.forEach(noteBlock => {
        if (noteBlock.pattern.length === 0) {
          return;
        }

        noteBlock.pattern.forEach(note => {
          let noteToSchedule;
          let isRest = false;

          if (typeof note === 'string') {
            noteToSchedule = note;
          } else {
            noteToSchedule = note.note;
            isRest = note.isRest;
          }

          logger.debug(
            `scheduling ${isRest ? 'rest' : 'note'} ${noteToSchedule} at ${elapsedTime}`,
          );

          if (!isRest) {
            this.Transport.schedule(this.triggerNote(noteToSchedule), elapsedTime);
          }

          elapsedTime += Tone.Time(noteToSchedule).toSeconds();
        });
      });
    });

    elapsedTime += TRAILING_TIME_SECONDS;
    logger.debug(`scheduling playback end at ${elapsedTime}`);
    this.Transport.schedule(this.stopPlayback.bind(this), elapsedTime);
  }
}

export default PlaybackHander;
