import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { View, Text, Button, StyleSheet} from "react-native";
import { toggleLogin } from "../../action/index.js";

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      login: true
    }
  }

  loginOut = () => {
    this.props.toggleLogin(false)
  }

  render() {
    return(
      <Fragment>
        <View style={styles.header}>
          <Text style={styles.title}>Tech To Protect</Text>
          {
            this.props.login ? <Button onPress={this.loginOut} title="Log Out"></Button> : null
          }
        </View>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000000",
    height: 50,
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
  }
})

const mapStateToProps = (state) => ({
  login: state.login
})

const mapDispatchToProps = (dispatch) => ({
  toggleLogin: bool => dispatch(toggleLogin(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)