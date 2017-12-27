/**
 *
 * withFileLoadHandler
 *
 */

import React from 'react';
import {
  getDisplayName,
  withState,
  compose,
  withHandlers,
} from 'recompose';
import {
  isFunction,
  assign,
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

      this.state = {
        fileReader: (() => {
          const fileReader = new FileReader();
          fileReader.onload = (file) => {
            // TODO: Agrgear validaciones por tipo de archivos
            const nextState = { buffer: arrayBuffer, success: true };
            const arrayBuffer = fileReader.result;
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
          fileReader.onloadend = () => {
            updateFileState({ isLoading: false });
          }
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
      const { updateFileState } = this.props;
      // Por el momento, se asume que solo se permite seleccionar un solo archivo.
      const file = target.files[0];
      if (file) {
        updateFileState({
          name: file.name,
          size: file.size,
          type: file.type,
          });
        fileReader.readAsArrayBuffer(file);
      }
    };

    afterLoad = (newFile) => {
      const { afterOnload } = this.props;
      if (afterOnload && isFunction) {
        afterOnload(newFile);
      }
    };

    render() {
      const { fileReader } = this.state;
      const newProps = assign({}, this.props, {
        fileReader: fileReader,
        openFileEventHandler: this.openFileEventHandler,
      });
      return <InputFileBase {...newProps} />;
    }
  }

  WithFileLoadHandler.propTypes = types.propTypes;
  WithFileLoadHandler.defaultProps = types.defaultProps;
  
  return compose(
    withState('file', 'setFile', initFileState),
    withHandlers({
      updateFileState,
    }),
  )(WithFileLoadHandler);
};

export default withFileLoadHandler;
