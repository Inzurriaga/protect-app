import React, {  Component ,Fragment } from "react";
import {
  View,
  Text
} from "react-native";

export default class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      test: "hello"
    }
  }

  render() {
    return(
      <Fragment>
        <View>
          <Text>hello im the bashboard</Text>
        </View>
      </Fragment>
    ) 
  }
}