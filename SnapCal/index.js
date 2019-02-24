import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ModCamera from './components/camera';

class Index extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ModCamera />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
