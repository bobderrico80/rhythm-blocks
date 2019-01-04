import React from 'react';
import PropTypes from 'prop-types';
import { playbackStates } from '../lib/constants';
import { noteBlock } from '../lib/commonPropTypes';
import PlaybackHandler from '../lib/PlaybackHandler';
import styles from './Player.module.css';
import play from '../assets/svg/play.svg';
import stop from '../assets/svg/stop.svg';

const propTypes = {
  measures: PropTypes.arrayOf(
    PropTypes.shape({
      noteBlocks: PropTypes.arrayOf(PropTypes.shape(noteBlock)),
    }),
  ),
  playbackState: PropTypes.oneOf(Object.values(playbackStates)).isRequired,
  onPlaybackStateChange: PropTypes.func.isRequired,
};

const defaultProps = {
  measures: [],
};

class Player extends React.Component {
  playbackHandler = new PlaybackHandler();

  onPlayClick = () => {
    if (!this.props.measures.length || !this.props.measures[0].noteBlocks.length) {
      return;
    }

    if (this.props.playbackState === playbackStates.STOPPED) {
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
      this.props.onPlaybackStateChange(playbackStates.PLAYING);
    });

    this.playbackHandler.Transport.on('stop', () => {
      this.props.onPlaybackStateChange(playbackStates.STOPPED);
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
    if (this.props.playbackState === playbackStates.PLAYING) {
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

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

export default Player;
