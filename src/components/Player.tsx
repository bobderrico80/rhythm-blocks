import React from 'react';
import PropTypes from 'prop-types';
import PlaybackHandler, { PlaybackState } from '../lib/PlaybackHandler';
import styles from './Player.module.css';
import play from '../assets/svg/player/play.svg';
import stop from '../assets/svg/player/stop.svg';
import { MeasureDefinition } from '../lib/createMeasureDefinitions';

interface PlayerProps {
  measures: MeasureDefinition[];
  playbackState: PlaybackState;
  onPlaybackStateChange: (playbackState: PlaybackState) => void;
}

class Player extends React.Component<PlayerProps> {
  static defaultProps = {
    measures: [],
  };

  playbackHandler = new PlaybackHandler();

  onPlayClick = () => {
    if (!this.props.measures.length || !this.props.measures[0].noteBlocks.length) {
      return;
    }

    if (this.props.playbackState === PlaybackState.STOPPED) {
      this.playbackHandler.startPlayback();
    } else {
      this.playbackHandler.stopPlayback();
    }
  };

  scheduleMeasures() {
    const totalMeasureDuration = this.props.measures.reduce((totalDuration, measure) => {
      return (totalDuration += measure.totalDuration);
    }, 0);

    if (totalMeasureDuration > 0) {
      this.playbackHandler.scheduleMeasures(this.props.measures);
    }
  }

  componentDidMount() {
    this.playbackHandler.Transport.on('start', () => {
      this.props.onPlaybackStateChange(PlaybackState.PLAYING);
    });

    this.playbackHandler.Transport.on('stop', () => {
      this.props.onPlaybackStateChange(PlaybackState.STOPPED);
    });

    this.scheduleMeasures();
  }

  componentDidUpdate() {
    this.scheduleMeasures();
  }

  componentWillUnmount() {
    this.playbackHandler.Transport.off('start');
    this.playbackHandler.Transport.off('stop');
  }

  renderButtonContents() {
    if (this.props.playbackState === PlaybackState.PLAYING) {
      return (
        <React.Fragment>
          <img src={stop} alt="Stop" className={styles.stopIcon} />
          <span>Stop</span>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <img src={play} alt="Play" className={styles.playIcon} />
        <span>Play</span>
      </React.Fragment>
    );
  }

  render() {
    return (
      <button onClick={this.onPlayClick} className={styles.playButton}>
        {this.renderButtonContents()}
      </button>
    );
  }
}

export default Player;
