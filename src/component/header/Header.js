import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import { toggleLogin } from "../../action";

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      login: true
    }
  }

  loginOut = () => {
    this.setState({
      login: false
    })
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

export default connect()(Header)