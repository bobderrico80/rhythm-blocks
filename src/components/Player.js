import React from 'react';
import PropTypes from 'prop-types';
import { noteBlock } from '../lib/commonPropTypes';
import { scheduleMeasures, startPlayback } from '../lib/playback';

const propTypes = {
  measures: PropTypes.arrayOf(
    PropTypes.shape({
      noteBlocks: PropTypes.arrayOf(PropTypes.shape(noteBlock)),
    }),
  ),
};

const defaultProps = {
  measures: [],
};

class Player extends React.Component {
  onPlayClick = () => {
    if (!this.props.measures.length || !this.props.measures[0].noteBlocks.length) {
      return;
    }

    startPlayback();
  };

  scheduleMeasures() {
    scheduleMeasures(this.props.measures);
  }

  componentDidMount() {
    this.scheduleMeasures();
  }

  componentDidUpdate() {
    this.scheduleMeasures();
  }

  render() {
    return <button onClick={this.onPlayClick}>Play</button>;
  }
}

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

export default Player;
