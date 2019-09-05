import React, {  Component ,Fragment } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  SafeAreaView
} from "react-native";

export class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      test: "hello"
    }
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
        </SafeAreaView>
      </Fragment>
    ) 
  }
}

export default connect()(DashBoard)