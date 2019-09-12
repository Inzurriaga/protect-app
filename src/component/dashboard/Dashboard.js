import React, {  Component ,Fragment } from "react";
import { connect } from "react-redux";
import io from 'socket.io-client/dist/socket.io';
import {
  View,
  Text,
  Button,
  SafeAreaView
} from "react-native";

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
        h2s: 90
      }
    }
    this.socket = io("http://localhost:3000");
    this.socket.emit('what', 'Hi server im the app');
    this.live = setInterval(() => {
      this.socket.emit("what", this.state.user)
    }, 5000)
  }

  componentDidMount() {
    this.hello()
  }

  hello = async () => {
    const response = await fetch("http://localhost:3000")
  }

  send = () => {
    this.socket.emit("what", "hello im the button")
  }

  render() {
    return(
      <Fragment>
        <SafeAreaView>
          <View>
            <Text>Heart Rate</Text>
            <Text>93 bpm</Text>
          </View>
          <View>
            <Text>SPO2</Text>
            <Text>93 bpm</Text>
          </View>
          <View>
            <Text>Temp</Text>
            <Text>98 F</Text>
          </View>
          <View>
            <View>
              <Text>Co2</Text>
              <Text>120 pp</Text>
            </View>
            <View>
              <Text>CO</Text>
              <Text>110 pp</Text>
            </View>
            <View>
              <Text>H2S</Text>
              <Text>120 pp</Text>
            </View>
          </View>
          <Button onPress={this.send}title="hello"></Button>
        </SafeAreaView>
      </Fragment>
    ) 
  }
}

export default connect()(DashBoard)