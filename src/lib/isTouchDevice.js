/* eslint-disable */
// https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#48198
const isTouchDevice = () => {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  const mq = function(query) {
    return window.matchMedia(query).matches;
  };

  if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
};

export default isTouchDevice;
