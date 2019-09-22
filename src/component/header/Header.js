import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
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
            this.props.login ? <TouchableOpacity onPress={this.loginOut}><Text style={styles.logOut}>LogOUt</Text></TouchableOpacity> : null
          }
        </View>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000000",
    height: 80,
    padding: 20
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  logOut: {
    color: "#ef3405",
    fontWeight: "bold",
    textAlign: "right"
  }
})

const mapStateToProps = (state) => ({
  login: state.login
})

const mapDispatchToProps = (dispatch) => ({
  toggleLogin: bool => dispatch(toggleLogin(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)