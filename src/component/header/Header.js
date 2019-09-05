import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
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
        <Text>Tech To Protect</Text>
        {
          this.props.login ? <Button onPress={this.loginOut} title="Log Out"></Button> : null
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login
})

const mapDispatchToProps = (dispatch) => ({
  toggleLogin: bool => dispatch(toggleLogin(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)