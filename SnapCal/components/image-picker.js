import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions} from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';
import Calendar from './CalendarUI.js';

export default class MyImagePicker extends React.Component {
  state = {
    image: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  render() {
    let { image } = this.state;
    ImagePicker.launchCameraAsync ({
      allowsEditing: true,
    });

    return <Calendar />;
  }
}
