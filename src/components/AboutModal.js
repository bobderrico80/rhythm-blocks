import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './AboutModal.module.css';
import { version } from '../../package.json';

const propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

const defaultProps = {
  isOpen: false,
};

Modal.setAppElement('#root');

const AboutModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      contentLabel="About Rhythm Blocks"
      className={styles.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <h2>About Rhythm Blocks Alpha</h2>
      <p>By Bob D'Errico</p>
      <p>Version: {version}</p>
      <p>
        This app is still under development. Check back for new features and bug fixes, or view{' '}
        <a
          href="https://github.com/bobderrico80/rhythm-blocks/milestones"
          target="_blank"
          rel="noopener noreferrer"
        >
          milestones
        </a>{' '}
        to see what's coming up
      </p>
      <p>
        Have a suggestion? Want to report a bug?{' '}
        <a
          href="https://github.com/bobderrico80/rhythm-blocks/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create an issue on GitHub
        </a>
        .
      </p>
      <p>
        View the source code on{' '}
        <a
          href="https://github.com/bobderrico80/rhythm-blocks"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
      <button className={styles.close} onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

AboutModal.propTypes = propTypes;
AboutModal.defaultProps = defaultProps;

export default AboutModal;
