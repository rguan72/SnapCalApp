import React, { Component, Fragment} from 'react';
import { AppRegistry, StyleSheet, Text, View, Modal, Dimensions, Platform, StatusBar} from 'react-native';
import { Button, withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ModCamera from './components/camera';
import ImagePicker from './components/image-picker';
import CalendarUI from './components/CalendarUI';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startCamera: false,
      startImagePicker: true,
    };

    this.toImagePicker = this.toImagePicker.bind(this);
  }

  toImagePicker() {
    this.setState({ startCamera: false, startImagePicker: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <View style={styles.appBar}>
          <Button
            type='clear'
            onPress={() => alert ('menu')}
            icon={<Icon name={Platform.OS == 'ios' ? 'ios-menu' : 'md-menu'} size={30} backgroundColor='transparent' color='white'/>}
            raised={true}
          />
          <Text style={styles.title} adjustsFontSizeToFit={true} numberOfLines={1}>SnapCal</Text>
          <Button
            type='clear'
            onPress={() => alert ('settings')}
            icon={<Icon name={Platform.OS == 'ios' ? 'ios-settings' : 'md-settings'} size={30} backgroundColor='transparent' color='white'/>}
            raised={true}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.random}/>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.cameraButton}
              onPress={() => this.setState ({startCamera: true})}
              icon={<Icon name={Platform.OS == 'ios' ? 'ios-camera' : 'md-camera'} size={30} backgroundColor='transparent' color='white'/>}
              raised={true}
            />
            <Button
              buttonStyle={styles.cameraButton}
              onPress={() => this.setState ({startImagePicker: true})}
              icon={<Icon name={Platform.OS == 'ios' ? 'ios-image' : 'md-image'} size={30} backgroundColor='transparent' color='white'/>}
              raised={true}
            />
          </View>
        </View>
        <Modal visible={this.state.startCamera} onRequestClose={() => this.setState ({startCamera: false})}>
            <ModCamera
              action={this.toImagePicker}
            />
        </Modal>
        <Modal visible={this.state.startImagePicker} onRequestClose={() => this.setState ({startImagePicker: false})}>
            <ImagePicker/>
        </Modal>
        <Modal visible={!this.state.startImagePicker} onRequestClose={() => this.setState ({startImagePicker: true})}>
          <Calendar/>
        </Modal>
      </View>
    );
  }
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  statusBar: {
    height: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
  },

  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  title: {
    color: "white",
    fontSize: 30,
  },

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EEE',
  },

  random: {
    height: Dimensions.get('window').height * 0.75,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  cameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 100,
    padding: 15,
    width: Dimensions.get('window').width * 0.175,
    height: Dimensions.get('window').width * 0.175,
  }
});

AppRegistry.registerComponent('App', () => Index);

export default Index;
