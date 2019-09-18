import React, {  Component ,Fragment } from "react";
import { connect } from "react-redux";
import io from 'socket.io-client/dist/socket.io';
import {
  View,
  Text,
  SafeAreaView
} from "react-native";
import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from "react-native-background-timer";
import bleManager from "react-native-ble-plx";

export class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        userId: 123,
        name: "bill",
        pulse: 97,
        sp02: 95,
        temperature: 98,
        co2: 180,
        co: 90,
        h2s: 90,
        lat: 0,
        long: 0,
      },
      timer: 0,
      timerL: 0
    }
    // web socket 
    this.socket = io("http://localhost:3000");
    // bluetooth 
    console.log(bleManager)
  }

  componentDidMount() {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
      authorizationLevel: "always"
    });

    // geolocation
    Geolocation.watchPosition(this.geoSuccess, this.geoError);

    // bleManager.startDeviceScan( null, null, (error, device) => {
    //   console.log(device)
    // })

    // background timer 
    BackgroundTimer.runBackgroundTimer(() => { 
      const num =Math.floor(Math.random() * 10)
      const user = {...this.state.user, co: num}
      this.socket.emit("what", user)
      this.setState({ user, 
        timer: this.state.timer + 1
      })
      }, 
      1000);

  }

  geoSuccess = (position) => {
    const {latitude, longitude } = position.coords
    this.setState({
      user: {...this.state.user, lat: latitude, long: longitude}
    })
  }

  geoError() {
    console.log("hello im the geo")
  }

  render() {
    const { user, timer } = this.state;
    return(
      <Fragment>
        <SafeAreaView>
          <View>
            <Text>Heart Rate</Text>
            <Text>{user.pulse} bpm</Text>
          </View>
          <View>
            <Text>SPO2</Text>
            <Text>{user.sp02} bpm</Text>
          </View>
          <View>
            <Text>Temp</Text>
            <Text>{user.temperature} F</Text>
          </View>
          <View>
            <View>
              <Text>Co2</Text>
              <Text>{user.co2} pp</Text>
            </View>
            <View>
              <Text>CO</Text>
              <Text>{user.co} pp</Text>
            </View>
            <View>
              <Text>H2S</Text>
              <Text>{user.h2s} pp</Text>
            </View>
          </View>
          <View>
            <Text>location</Text>
            <Text>Lat {user.lat}</Text>
            <Text>long {user.long}</Text>
          </View>
          <View>
            <Text>library {timer}</Text>
          </View>
        </SafeAreaView>
      </Fragment>
    ) 
  }

  componentWillUnmount() {
    BackgroundTimer.stopBackgroundTimer();
  }
}

export default connect()(DashBoard)