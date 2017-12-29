import React from 'react';
import PropTypes from 'prop-types';
import {
  uniqueId,
} from 'lodash';
import fileHandler from '../../../../HOC/withFileLoadHandler';
import RaisedButton from 'material-ui/RaisedButton';
import InputFile from '../../atoms/InputFile';
import ActionFile from 'material-ui/svg-icons/file/file-upload';
import styles from './styles';

export const UploadFile = ({
  id,
  label,
  openFileEventHandler,
  handleLoadFile,
  style,
  styleType,
  file,
  loadingComponent,
  children,
}) => {
  const fileInput = (() => {
    switch (styleType) {
      case 'material-ui':
        return (
          <RaisedButton
            label={label}
            labelPosition="before"
            icon={<ActionFile />}
            containerElement="label"
          >
            <InputFile
              openFileEventHandler={openFileEventHandler}
              id={id}
              style={{ ...styles.inputFile, display: 'none'}}
            />
          </RaisedButton>
        );
      case 'none':
        return (
          <InputFile
            openFileEventHandler={openFileEventHandler}
            id={id}
          >
            {children}
          </InputFile>
        )
      default:
        return (
          <InputFile
            openFileEventHandler={openFileEventHandler}
            id={id}
          >
            {children}
          </InputFile>
        )
    }
  })();
  return file.isLoading && loadingComponent ? loadingComponent : fileInput;
}
UploadFile.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  openFileEventHandler: PropTypes.func,
  handleLoadFile: PropTypes.func,
  loadingComponent: PropTypes.element,
  children: PropTypes.element,
  styleType: PropTypes.oneOf([
    'none',
    'material-ui',
  ])
}
UploadFile.defaultProps = {
  id: uniqueId('file_'),
  styleType: 'none',
  label: '',
  openFileEventHandler: PropTypes.noop,
  handleLoadFile: PropTypes.noop,
  children: null,
  loadingComponent: <div>Cargando archivo</div>
}
export default fileHandler(UploadFile);