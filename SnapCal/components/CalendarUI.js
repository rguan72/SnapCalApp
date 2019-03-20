'use strict';
import React, { Component } from 'react';
import { StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, Permissions } from 'expo';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';


export default class CalendarUI extends Component {
  constructor (props) {
    super (props);
    this.state = {
      visible: false,
      my_event: null,
    }
  }

  async addEvent() {
    let start = new Date('March 11, 2019 11:25:00');
    let end = new Date('March 11, 2019 12:25:00');
    let my_event = {
                    title: 'Sample Event',
                    startDate: start,
                    endDate: end,
                    timeZone: 'EST',
                    };
    this.setState ({my_event: my_event});
    const { status } = await Permissions.getAsync(Permissions.CALENDAR);
    if (status !== 'granted') {
      Permissions.askAsync(Permissions.CALENDAR);
    } else {
      Calendar.createEventAsync(Calendar.DEFAULT, my_event)
        .then(event => {
          console.log('success', event);
        })
        .catch(error => {
          console.log('failure', error)
        });
    }
  }

  render() {
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
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          // dialogTitle={<DialogTitle title={this.state.my_event.title} />}
          // footer={
          //   <DialogFooter>
          //     <DialogButton
          //       text="CANCEL"
          //       onPress={() => {this.setState({ visible: false });}}
          //     />
          //     <DialogButton
          //       text="OK"
          //       onPress={this.addEvent}
          //     />
          //   </DialogFooter>
          // }
        >
          <DialogContent>
            <Text>HELLO</Text>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
