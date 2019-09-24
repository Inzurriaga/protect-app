import React, {  Component ,Fragment } from "react";
import { connect } from "react-redux";
import io from 'socket.io-client/dist/socket.io';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions
  
} from "react-native";
// import BackgroundTimer from "react-native-background-timer";
import { BleManager } from "react-native-ble-plx";
import { Card } from "react-native-material-ui";
import Location from "../location/Location"
import { bluetoothConnection } from "../../action"

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


export class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        userId: 123,
        name: "bill",
        pulse: 97,
        sp02: 95,
        temperature: 0,
        co2: 180,
        co: 90,
        h2s: 90,
      },
      bluetoothScanning: true,
    }
    // web socket 
    this.socket = io("http://localhost:3000");
    // bluetooth 
    this.manager = new BleManager()
  }

  componentDidMount = () => {
    console.log(this.state.user)
    console.log(this.props.bluetoothConnectionStatus)
    this.manager.startDeviceScan(null, null, (error, device) => {
      console.log(device)
      if(device.name === "DSD TECH" && !this.props.bluetoothConnectionStatus ) {
        this.manager.stopDeviceScan();
        this.setState({
          bluetoothScanning: false
        }, this.connectToDevice(device))
      }
    })
  }


  connectToDevice = (device) => {
    this.manager.connectToDevice(device.id).then((connectedDevice) => {
      connectedDevice.discoverAllServicesAndCharacteristics(
        connectedDevice.id
      ).then(() => {
        this.props.bluetoothConnection(true);
        this.monitorDevice(connectedDevice);
      })
    })
  }

  monitorDevice = (connectedDevice) => {
    this.manager.monitorCharacteristicForDevice(connectedDevice.id, "0000ffe0-0000-1000-8000-00805f9b34fb", "0000ffe1-0000-1000-8000-00805f9b34fb", (error, char) => {
      this.setState({
        user: {...this.state.user, temperature: Math.round(atob(char.value)*10)/10 }
      }, this.updateHub() )
    })
  }

  updateHub = () => {
    console.log(this.state.user.temperature)
  }

  render() {
    const { user } = this.state;
    return(
      <Fragment>
        <SafeAreaView style={styles.dashBoard}>
          <View style={styles.sensorContainer}>
            <View style={styles.sensorData}>
              <Text style={styles.sensorDataText}>{user.pulse} bpm</Text>
              <Text style={styles.DataTypeText}>Heart Rate</Text>
            </View>
            <View style={styles.sensorData}>
              <Text style={styles.sensorDataText}>{user.sp02} bpm</Text>
              <Text style={styles.DataTypeText}>SPO2</Text>
            </View>
            <View style={styles.sensorData}>
              <Text style={styles.sensorDataText}>{ user.temperature + "\u00b0 F" }</Text>
              <Text style={styles.DataTypeText}>Temp</Text>
            </View>
          </View>
          <View style={styles.sensorContainer}>
            <View style={styles.sensorData}>
              <Text style={styles.sensorDataText}>{user.co2} pp</Text>
              <Text style={styles.DataTypeText}>Co2</Text>
            </View>
            <View style={styles.sensorData}>
              <Text style={styles.sensorDataText}>{user.co} pp</Text>
              <Text style={styles.DataTypeText}>CO</Text>
            </View>
            <View style={styles.sensorData}>
              <Text style={styles.sensorDataText}>{user.h2s} pp</Text>
              <Text style={styles.DataTypeText}>H2S</Text>
            </View>
          </View>
          <Location />
        </SafeAreaView>
      </Fragment>
    ) 
  }

  componentWillUnmount() {
    // this.manager.cancelDeviceConnection()
  }
}

export const mapStateToProps = (state) => ({
  bluetoothConnectionStatus: state.bluetoothConnectionStatus
})

export const mapDispatchToProps = (dispatch) => ({
  bluetoothConnection: bool => dispatch(bluetoothConnection(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)

const styles = StyleSheet.create({
  dashBoard: {
    flex: 1,
  },
  sensorContainer: {
    display: "flex",
    flexDirection: "row",
    elevation: 1,
    justifyContent: "space-around",
    borderRadius: 25,
    margin: 10,
    backgroundColor: "#ffffff",
  },
  sensorData: {
    padding: 20,
  },
  sensorDataText: {
    fontSize: 30,
    color: "#000000"
  },
  DataTypeText: {
    textAlign: "center",
    color: "#000000"
  }
});