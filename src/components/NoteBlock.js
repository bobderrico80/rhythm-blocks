import React from 'react';
import styles from './NoteBlock.module.css';

class NoteBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, css, svg, alt } = this.props;

    return (
      <div className={`${styles.note} ${styles[css]} ${className}`}>
        <img src={svg} alt={alt} />
      </div>
    );
  }
}

export default NoteBlock;
