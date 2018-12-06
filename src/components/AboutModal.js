import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './AboutModal.module.css';

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
      <p>Version: 0.0.0</p>
      <p>This app is still under development. Check back for new features and bug fixes.</p>
      <p>
        Have a suggestion? Want to report a bug?{' '}
        <a href="mailto:bobderrico80@gmail.com">Send me an email</a>.
      </p>
      <p>
        View the source code on <a href="https://github.com/bobderrico80/rhythm-blocks">GitHub</a>.
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
