import React, { Component, Fragment } from 'react';
import { AppRegistry, StyleSheet, Text, View, Modal, Dimensions, Platform, StatusBar } from 'react-native';
import { Button, withTheme } from 'react-native-elements';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class Layout extends Component {
  
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
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
})