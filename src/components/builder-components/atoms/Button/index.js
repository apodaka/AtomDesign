import React from 'react';
import types from 'prop-types';

export const Button = ({
  styleType,
  onClick,
  label,
  style,
  libName,
  buttonType,
  ...props,
}) => {
  const getButton = (() => {
    switch (styleType) {
      case 'material-ui':
        const importName = `${libName}/${buttonType}`;
        try {
          const Button = require(importName).default;
          return (
            <Button
              label={label}
              onClick={onClick}
            />
          );
        } catch (e) {
          console.log(e);
          return (
            <button
              onClick={onClick}
              style={style}
              {...props}
            >
              {`Error al cargar styleType: ${styleType}`}
            </button>
          );
        }
      default:
        return (
          <button
            onClick={onClick}
            style={style}
            {...props}
          >
            {label}
          </button>
        );
    }
  })();
  return getButton;
}
Button.propTypes = {
  styleType: types.string,
  onClick: types.func,
  label: types.string,
  style: types.object,
  libName: types.oneOf([
    'material-ui',
  ]),
  buttonType: types.oneOf([
    'RaisedButton',
    'FlatButton',
  ]),
};
Button.defaultProps = {
  libName: 'material-ui',
  buttonType: 'RaisedButton',
  styleType: '',
  onClick: types.noop,
  label: 'button',
  style: {},
};
export default Button;