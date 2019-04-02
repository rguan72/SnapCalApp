'use strict';
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, withTheme } from 'react-native-elements';
import { Calendar, Permissions } from 'expo';
import Dialog, { DialogTitle, DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { withNavigation } from 'react-navigation';


let start = new Date('March 11, 2019 11:25:00');
let end = new Date('March 11, 2019 12:25:00');

class CalendarUI extends Component {
  constructor (props) {
    super (props);
    this.state = {
      visible: true,
      my_event: {
        title: 'Sample Event',
        startDate: start,
        endDate: end,
        timeZone: 'EST',
        },
    };
    this.addEvent = this.addEvent.bind (this);
  }

  async addEvent() {
    const { status } = await Permissions.getAsync(Permissions.CALENDAR);
    if (status !== 'granted') {
      Permissions.askAsync(Permissions.CALENDAR);
    } else {
      Calendar.createEventAsync(Calendar.DEFAULT, this.state.my_event)
        .then(event => {
          console.log('success', event);
        })
        .catch(error => {
          console.log('failure', error)
        });
    }
  }

  render() {
    const {my_event} = this.state;
    return (
      <View>
        <Button
          title="Show Dialog"
          onPress={() => {
            this.setState({ visible: true });
          }}
        />
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => this.setState({ visible: false })}
          width={0.5}
          height={0.7}
          dialogTitle={<DialogTitle title={my_event.title} />}
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                onPress={() => this.setState({ visible: false })}
              />
              <DialogButton
                text="OK"
                onPress={() => {
                  this.addEvent ();
                  this.setState ({visible:false});
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>{String (my_event.startDate)}</Text>
            <Text>{String (my_event.endDate)}</Text>
            <Text>{my_event.timeZone}</Text>
          </DialogContent>
        </Dialog>
        <Button
          buttonStyle={styles.cameraButton}
          onPress={ () => {this.props.navigation.navigate('ImagePicker')} }
          icon={<Icon name={Platform.OS == 'ios' ? 'ios-camera' : 'md-camera'} size={30} backgroundColor='transparent' color='white'/>}
          raised={true}
        />
      </View>
    );
  }
}

export default withNavigation(CalendarUI);

const styles = StyleSheet.create({
  cameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 100,
    padding: 15,
    width: Dimensions.get('window').width * 0.175,
    height: Dimensions.get('window').width * 0.175,
  },
  atEnd: {
    justifyContent: 'flex-end',
  }
});
