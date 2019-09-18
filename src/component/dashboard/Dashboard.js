import React, {  Component ,Fragment } from "react";
import { connect } from "react-redux";
import io from 'socket.io-client/dist/socket.io';
import {
  View,
  Text,
  SafeAreaView
} from "react-native";import Geolocation from '@react-native-community/geolocation';

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
      }
    }
    // web socket 
    this.socket = io("http://localhost:3000");
    // geolaction 
  }

  componentDidMount() {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
      authorizationLevel: "always"
    });
    Geolocation.watchPosition(this.geoSuccess, this.geoError);
    this.live = setInterval(() => {
      const num =Math.floor(Math.random() * 10)
      const user = {...this.state.user, co: num}
      this.socket.emit("what", user)
      this.setState({user})
    }, 1000);
  }

  geoSuccess = (position) => {
    const {latitude, longitude } = position.coords
    console.log(latitude, longitude)
    this.setState({
      user: {...this.state.user, lat: latitude, long: longitude}
    })
  }

  geoError() {
    console.log("hello im the geo")
  }

  render() {
    const { user } = this.state;
    console.log(user)
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
        </SafeAreaView>
      </Fragment>
    ) 
  }

  componentWillUnmount() {
    clearInterval(this.live)
  }
}

export default connect()(DashBoard)