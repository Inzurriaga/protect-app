import React, { Fragment, Component } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
  Dimensions
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      test: "hello world"
    }
  }

  render() {
    return(
      <Fragment>
        <SafeAreaView style={styles.login}>
          <View style={styles.inputForm}>
            <Text>Station ID</Text>
            <TextInput style={styles.input}/>
          </View>
          <View style={styles.inputForm}>
            <Text>username</Text>
            <TextInput style={styles.input}/>
          </View>
          <View style={styles.inputForm}>
            <Text>password</Text>
            <TextInput style={styles.input}/>
          </View>
          <Button title="Login"/>
        </SafeAreaView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    display: "flex",
    alignItems: "center",
  },
  inputForm: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    width: width * .8,
    padding: 10
  },
});

