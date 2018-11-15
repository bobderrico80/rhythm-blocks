import PropTypes from 'prop-types';
import { noteTypes } from './constants';

export const note = {
  type: PropTypes.oneOf(Object.values(noteTypes)).isRequired,
  id: PropTypes.string.isRequired,
  svg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};
