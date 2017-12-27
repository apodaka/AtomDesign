import React from 'react';
import fileHandler from '../../../HOC/withFileLoadHandler';
import {
  uniqueId
} from 'lodash';
import types from 'prop-types';
const InputFile = ({
  onChange,
  id,
  children,
  openFileEventHandler,
  file,
}) => {
  console.log('fieState', file)
  return (
    <div>
      <input
        type="file"
        id={id}
        multiple
        onChange={openFileEventHandler}
        style={{ display: 'none' }}
      />
      <label htmlFor={id}>
        {children}
      </label>
    </div>
  );
}

InputFile.propTypes = {
  onChange: types.func,
  id: types.string,
  children: types.element,
}
InputFile.defaultProps = {
  onChange: types.noop,
  id: uniqueId('file_'),
  children: <div />,
}

export default fileHandler(InputFile);
// export default class extends Component {
//   static propTypes = {
//     id: types.string.isRequired,
//   };
//   static defaultProps = {
//     id: uniqueId('file_'),
//   };
//   render() {
//     const {
//       id,
//     } = this.props;
//     return (
//       <input
//         type="file"
//         id={id}
//         multiple
//         onChange={this.handleChange}
//       />
//     );
//   }
// }