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
import AddIcon from './images/ic-plus';
import InputFile from './components/builder-components/atoms/InputFile';
import { Container, ImageIcon } from "./styledComponents";
import IMAGES from './images';
import App from './containers/App';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  border: "1px solid red"
};

const Main = (props) => {
  console.log('props', props);
  const handeOnLoadChange = (file) => {
    console.log('fie from handleOnLoadChanges', file);
  };
  console.log('MuiThemeProvider', MuiThemeProvider)
  return (
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  );
}

const INIT_STATE = {
  images: [
    { src: IMAGES.image1 },
    { src: IMAGES.image2 },
    { src: IMAGES.image3 },
  ],
  selectedIndex: -1,
}
const MainComponent = compose(
  withStateHandlers(INIT_STATE, {
    addImages: ({ images }) => (value) => ({
      images: images.concat(value),
    }),
  })
)(Main);
render(<Main />, document.getElementById("root"));
