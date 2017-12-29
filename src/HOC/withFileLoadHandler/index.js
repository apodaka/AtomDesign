/**
 *
 * withFileLoadHandler
 *
 */

import React from 'react';
import PropTypes, { noop } from 'prop-types';
import {
  getDisplayName,
  withState,
  compose,
  withHandlers,
} from 'recompose';
import {
  isFunction,
  assign,
  isBoolean,
  } from 'lodash';
import types from './props';
import initFileState from './state';
import { updateFileState } from './stateHandlers';

const withFileLoadHandler = (InputFileBase) => {
  class WithFileLoadHandler extends React.Component { // eslint-disable-line
    static displayName = `withFileLoadHandler(${getDisplayName(InputFileBase)})`;
    constructor(props) {
      super(props);
      const { updateFileState, setFile } = props;
      this.transformMethod = {
        buffer: 'readAsArrayBuffer',
        url: 'readAsDataURL',
      };
      this.state = {
        fileReader: (() => {
          const fileReader = new FileReader();
          fileReader.onload = (file) => {
            // TODO: Agrgear validaciones por tipo de archivos
            const data = fileReader.result;
            const nextState = { buffer: data, success: true, isLoading: false };
            setFile((f) => {
              const nextFile = assign(f, nextState);
              this.afterLoad(nextFile);
              return nextFile;
            });
          };
          fileReader.onabort = () => {
            updateFileState(initFileState);
          };
          fileReader.onloadstart = () => {
            updateFileState({ isLoading: true });
          };
          fileReader.onerror = (e) => {
            updateFileState({
              error: e,
              success: false,
            });
          };
          return fileReader;
        })(),
      };
    }

    openFileEventHandler = ({ target }) => {
      const { fileReader } = this.state;
      const { updateFileState, transform } = this.props;
      // Por el momento, se asume que solo se permite seleccionar un solo archivo.
      const file = target.files[0];
      if (file) {
        updateFileState({
          name: file.name,
          size: file.size,
          type: file.type,
          });
        const transformMethod = this.transformMethod[transform];
        fileReader[transformMethod](file);
      }
    };

    afterLoad = (newFile) => {
      const { afterOnload } = this.props;
      if (isFunction(afterOnload)) {
        afterOnload(newFile);
      }
    };

    render() {
      const { fileReader } = this.state;
      const props = Object.assign({}, this.props, {
        fileReader: fileReader,
        openFileEventHandler: this.openFileEventHandler,
      });
      return <InputFileBase {...props} />;
    }
  }

  WithFileLoadHandler.propTypes = {
    setFile: PropTypes.func,
    updateFileState: PropTypes.func,
    afterOnload: PropTypes.func,
    transform: PropTypes.oneOf([
      'buffer',
      'url',
    ]),
  };
  WithFileLoadHandler.defaultProps = {
    setFile: noop,
    updateFileState: noop,
    afterOnload: noop,
    transform: 'buffer',
  };
  
  return compose(
    withState('file', 'setFile', initFileState),
    withHandlers({
      updateFileState,
    }),
  )(WithFileLoadHandler);
};

export default withFileLoadHandler;
