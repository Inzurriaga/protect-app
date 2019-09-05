import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { toggleLogin } from "../../action";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      test: "hello world"
    }
  }

  loginInUser = () => {
    this.props.toggleLogin(true)
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
          <TouchableOpacity onPress={this.loginInUser} title="Login" style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius:  25,
    padding: 10,
  }
});

const mapDispatchToProps = ( dispatch ) => ({
  toggleLogin: bool => dispatch(toggleLogin(bool))
})

export default connect(null, mapDispatchToProps)(Login)

