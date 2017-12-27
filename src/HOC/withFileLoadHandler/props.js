import PropTypes, { noop } from 'prop-types';

export const propTypes = {
  setFile: PropTypes.func,
  updateFileState: PropTypes.func,
  afterOnload: PropTypes.func,
};

export const defaultProps = {
  setFile: noop,
  updateFileState: noop,
  afterOnload: noop,
};
export default {
  propTypes,
  defaultProps,
}
