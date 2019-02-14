class PlaybackHandler {
  Transport = {
    on: jest.fn(),
    off: jest.fn(),
  };
  scheduleMeasures = jest.fn();
  startPlayback = jest.fn();
  stopPlayback = jest.fn();
}

export default PlaybackHandler;
