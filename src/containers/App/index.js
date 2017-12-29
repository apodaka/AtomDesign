import React, { Component } from 'react';
import UploadFile from '../../components/builder-components/molecules/uploadFile';
import Button from '../../components/builder-components/atoms/Button';
const Divider = () => <div style={{ height: '10px', width: '100%' }} />
export class App extends Component {
  afterLoadFile = (file) => {
    console.log('afterLoadFile file', file);
  }
  render() {
    return (
      <div>
        <UploadFile
          id="upload-file"
          styleType="material-ui"
          afterOnload={this.afterLoadFile}
          label="upload file"
        />
        <Divider />
        <Button
          label="CUSTOM BUTTON"
          styleType="material-ui"
          buttonType="FlatButton"
        />
      </div>
    )
  }
}

export default App;