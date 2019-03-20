'use strict';
import React, { Component } from 'react';
import { StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, Permissions } from 'expo';
import Dialog, { DialogTitle, DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';


let start = new Date('March 11, 2019 11:25:00');
let end = new Date('March 11, 2019 12:25:00');

export default class CalendarUI extends Component {
  constructor (props) {
    super (props);
    this.state = {
      visible: false,
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
      </View>
    );
  }
}
