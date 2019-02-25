import RNMlKit from 'react-native-firebase-mlkit';

export class textRecognition extends Component {
  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5,
                        base64: true,
                        skipProcessing: true,
                        forceUpOrientation: true};

      const data = await this.camera.takePictureAsync(options);
      const deviceTextRecognition = await RNMlKit.deviceTextRecognition(data.uri);
      console.log('Text Recognition On-Device', deviceTextRecognition);
    }
  };
}
