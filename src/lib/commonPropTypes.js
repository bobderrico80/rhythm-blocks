import PropTypes from 'prop-types';
import { noteIds } from './constants';

export const note = {
  id: PropTypes.oneOf(Object.values(noteIds)).isRequired,
  svg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};
