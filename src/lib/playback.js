import Tone from 'tone';
import logger from './logger';

const synth = new Tone.Synth().toMaster();
const NOTE_PITCH = 'F4';
const NOTE_SPACING = '16n';
const TRAILING_TIME_SECONDS = 1;

export const Transport = Tone.Transport;

Transport.on('start', () => {
  logger.debug('start');
});

Transport.on('stop', () => {
  logger.debug('stop');
});

const endPlayback = () => {
  Transport.stop();
};

const triggerNote = duration => time => {
  logger.debug(`triggering ${duration} at ${time}`);
  synth.triggerAttackRelease(NOTE_PITCH, Tone.Time(duration) - Tone.Time(NOTE_SPACING), time);
};

export const scheduleMeasures = measures => {
  Transport.cancel();

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

        logger.debug(`scheduling ${isRest ? 'rest' : 'note'} ${noteToSchedule} at ${elapsedTime}`);

        if (!isRest) {
          Transport.schedule(triggerNote(noteToSchedule), elapsedTime);
        }

        elapsedTime += Tone.Time(noteToSchedule).toSeconds();
      });
    });
  });
  elapsedTime += TRAILING_TIME_SECONDS;
  logger.debug(`scheduling playback end at ${elapsedTime}`);
  Transport.schedule(endPlayback, elapsedTime);
};

export const startPlayback = () => {
  Transport.start();
};

export const stopPlayback = () => {
  Transport.stop();
};
