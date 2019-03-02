import React, { Component } from 'react';
import
{ StyleSheet, Text, View, Image, Button } from 'react-native';
import ImagePicker from "react-native-image-picker";

export default class App extends Component
{
  state = {
    pickedImage: null
  }

  reset = () => {
    this.setState({pickedImage: null});
  }
  pickImageHandler = () => {
    ImagePicker.showImagePicker({
      title: "Pick an Image",
      maxWidth: 800, maxHeight: 600
    }, res =>{
      if (res.didCancel)
        console.log("User cancelled!");
      else if (res.error)
        console.log("Error", res.error);
      else
        this.setState({pickedImage: { uri: res.uri }});
    });
  }

  resetHandler = () => {
    this.reset();
  }

  render ()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Pick Image From Camera and Gallery</Text>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>

          <Button title="Pick Image" onPress={this.pickImageHandler} />

          <Button title="Reset" onPress={this.resetHandler} />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    alignItems: "center"
  },

  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "red",
    marginTop: 10
  },

  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "70%",
    height: 280,
    marginTop: 50,
  },

  button: {
    width: "80%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  
  previewImage: {
    width: "100%",
    height: "100%"
  }
});