import React from "react";
import {
  fromJS,
  toJS,
} from 'immutable';
import {
  keys,
} from 'lodash';
import { render } from "react-dom";
import {
  compose,
  withStateHandlers,
} from 'recompose';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IMAGES from './images';
import App from './containers/App';

const Main = (props) => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);
render(<Main />, document.getElementById("root"));
