import debug from 'debug';

const BASE = 'rhythm-blocks';
const COLORS = {
  debug: 'green',
  info: 'blue',
  warn: 'orange',
  error: 'red',
};

class Logger {
  generateMessage(level, message, source) {
    const namespace = `${BASE}:${level}`;
    const createDebug = debug(namespace);

    createDebug.color = COLORS[level];

    if (source) {
      createDebug(source, message);
    } else {
      createDebug(message);
    }
  }

  debug(message, source) {
    return this.generateMessage('debug', message, source);
  }

  info(message, source) {
    return this.generateMessage('info', message, source);
  }

  warn(message, source) {
    return this.generateMessage('warn', message, source);
  }

  error(message, source) {
    return this.generateMessage('error', message, source);
  }
}

export default new Logger();
