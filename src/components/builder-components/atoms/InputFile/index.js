import React from 'react';
import {
  uniqueId,
  isNull,
} from 'lodash';
import types from 'prop-types';
const InputFile = ({
  id,
  children,
  openFileEventHandler,
  style,
  hiddenLabel,
}) => {
  const visible = hiddenLabel ? 'hidden' : 'visible';
  if (isNull(children)) {
    return (
      <input
        type="file"
        id={id}
        multiple
        onChange={openFileEventHandler}
        style={style}
      />
    );
  }
  return (
    <div>
      <input
        type="file"
        id={id}
        multiple
        onChange={openFileEventHandler}
        style={{ ...style, visibility: visible }}
      />
      <label htmlFor={id}>
        {children}
      </label>
    </div>
  );
  
}
const uniqueFileId = uniqueId('file_');
InputFile.propTypes = {
  id: types.string,
  children: types.element,
  style: types.object,
  hiddenLabel: types.bool,
}
InputFile.defaultProps = {
  id: uniqueFileId,
  children: null,
  hiddenLabel: true,
  style: {},
}

export default InputFile;