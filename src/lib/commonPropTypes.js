import PropTypes from 'prop-types';
import { noteBlockTypes } from './constants';

export const noteBlock = {
  type: PropTypes.oneOf(Object.values(noteBlockTypes)).isRequired,
  id: PropTypes.string.isRequired,
  svg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};
