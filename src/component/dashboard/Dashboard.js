import React, {  Component ,Fragment } from "react";
import { connect } from "react-redux";
import io from 'socket.io-client/dist/socket.io';
import {
  PermissionsAndroid,
  View,
  Text,
  SafeAreaView
} from "react-native";
import BackgroundTimer from "react-native-background-timer";
import { BleManager } from "react-native-ble-plx";
import Location from "../location/Location"


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
      },
      timer: 0,
      timerL: 0,
      bluetooth: "none"
    }
    // web socket 
    this.socket = io("http://localhost:3000");
    // bluetooth 
    this.manager = new BleManager()
  }

  componentDidMount() {
    this.manager.startDeviceScan( null, null, (error, device) => {
      console.log(device)
      this.setState({
        bluetooth: device 
      })
    })

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

  render() {
    const { user, timer, bluetooth } = this.state;
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
          <Location />
          <View>
            <Text>library {timer}</Text>
            <Text>device {bluetooth}</Text>
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