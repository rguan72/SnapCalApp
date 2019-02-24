'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class ModCamera extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

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
          <Camera style={styles.camera} type={this.state.type}>
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
                onPress={() => {console.log('hi')}}
                color="#841584"
              />
          </Camera>
        </View>
      );
    }
  }
}

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
    width: 1000,
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
