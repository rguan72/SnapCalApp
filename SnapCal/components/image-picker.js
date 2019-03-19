import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions} from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';

export default class MyImagePicker extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status2 } = await Permissions.askAsync (Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    let { image } = this.state;
    // const { hasCameraPermission } = this.state;
    ImagePicker.launchCameraAsync ({
      allowsEditing: true,
    });

    return null;
    // return (
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Button
    //       title="Pick an image from camera roll"
    //       onPress={this._pickImage}
    //     />
    //     <Button
    //       title="Take a photo"
    //       onPress={this._takeImage}
    //     />
    //     {image &&
    //       <Image source={{ uri: image }} style={{ width: Dimensions.get('window').width * 0.5, height: Dimensions.get('window').height * 0.5 }} />}
    //   </View>
    // );
  }

  // _pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //   });
  // 
  //   console.log(result);
  //
  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //   }
  // };
  //
  // _takeImage = async () => {
  //   let result = await ImagePicker.launchCameraAsync ({
  //     allowsEditing: true,
  //   });
  //
  //   console.log(result);
  //
  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //   }
  // };
}
