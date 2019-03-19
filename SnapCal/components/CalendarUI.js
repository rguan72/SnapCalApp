'use strict';
import React, { Component } from 'react';
import { StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, Permissions } from 'expo';


export default class CalendarUI extends Component {
  async addEvent() {
    let start = new Date('March 11, 2019 11:25:00');
    let end = new Date('March 11, 2019 12:25:00');
    let my_event = {
                    title: 'Sample Event',
                    startDate: start,
                    endDate: end,
                    timeZone: 'EST',
                    };

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
          title="add event"
          onPress={this.addEvent}
        />
      </View>
    );
  }
}
