import debug from 'debug';

export enum LOG_LEVEL {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export enum COLOR {
  GREEN = 'green',
  BLUE = 'blue',
  ORANGE = 'orange',
  RED = 'red',
}

const LOG_LEVEL_COLOR_MAP: { [level: number]: COLOR } = {
  [LOG_LEVEL.DEBUG]: COLOR.GREEN,
  [LOG_LEVEL.INFO]: COLOR.BLUE,
  [LOG_LEVEL.WARN]: COLOR.ORANGE,
  [LOG_LEVEL.ERROR]: COLOR.RED,
};

const BASE = 'rhythm-blocks';

class Logger {
  private generateMessage(level: LOG_LEVEL, message: string, source?: string) {
    const namespace = `${BASE}:${level}`;
    const createDebug = debug(namespace);

    createDebug.color = LOG_LEVEL_COLOR_MAP[level];

    if (source) {
      createDebug(source, message);
    } else {
      createDebug(message);
    }
  }

  debug(message: string, source?: string) {
    return this.generateMessage(LOG_LEVEL.DEBUG, message, source);
  }

  info(message: string, source?: string) {
    return this.generateMessage(LOG_LEVEL.INFO, message, source);
  }

  warn(message: string, source?: string) {
    return this.generateMessage(LOG_LEVEL.INFO, message, source);
  }

  error(message: string, source?: string) {
    return this.generateMessage(LOG_LEVEL.ERROR, message, source);
  }
}

export default new Logger();
