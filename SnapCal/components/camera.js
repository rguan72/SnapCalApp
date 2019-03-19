'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, Dimensions } from 'react-native';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, Permissions } from 'expo';
import * as firebase from 'firebase';
let apikey = require('../../apikey.json');

export default class ModCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5,
                        base64: true,
                        skipProcessing: true,
                        forceUpOrientation: true};

      const data = await this.camera.takePictureAsync(options);
      let body_data = {
        "requests": [
          {
          "image": {
            "content": data.base64
          },

        "features": [
          {
            "type": "DOCUMENT_TEXT_DETECTION"
          }
        ]
      }
    ]
    }
    let url = 'https://vision.googleapis.com/v1/images:annotate?key=' + apikey.apikey;
    let req = new Request(
      url,
      {
        method: 'POST',
        headers:  {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body_data)
      }
    );

    fetch(req)
      .then((response) => {
        if (response.status !== 200) {
          console.log('Issue encountered: Status Code -- ' + response.status);
          return;
        }
        else {
          response.json().then((data) => {
            console.log(data.responses[0].fullTextAnnotation.text);
          });
        }
      });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>No Permissions</Text>;
    }
    else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera
            ref = {ref => {
              this.camera = ref;
            }}
            style={styles.camera}
            type={this.state.type}
          >
            <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 100, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <Button
                style={styles.button}
                title="Hi!"
                onPress={this.takePicture.bind(this)}
                color="#841584"
              />
              <Button
                title="Image Picker"
                style={{ alignSelf: 'flex-end' }}
                icon={<Icon name={Platform.OS == 'ios' ? 'ios-image' : 'md-image'} size={30} backgroundColor='transparent' color='white'/>}
                onPress={this.props.action}
                raised={true}
              />
          </Camera>
        </View>
      );
    }
  }
}

// Initialize firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBL_ec68lNF7vZ8tvVA0AsLRsfIh0XW15k'
};

firebase.initializeApp(firebaseConfig);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  opacity: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  button: {
    fontSize: 10,
    color: 'white',
    margin: 'auto',
  }
});
