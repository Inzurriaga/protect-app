import React, {Fragment} from 'react';
import { connect } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions
} from 'react-native';
import Header from "../header/Header";
import Login from "../login/Login";
import DashBoard from '../dashboard/Dashboard';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const App = (props) => {
  return (
      <Fragment>
        <SafeAreaView style={styles.app}>
            <Header />
            {
              props.login ? <DashBoard /> : <Login />
            }
        </SafeAreaView>
      </Fragment>
  );
};

const mapStateToProps = (state) => ({
  login: state.login
})

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#000000"
  },
  header: {
    backgroundColor: "#000000",
    height: 30,
    width: width
  },
  header_title: {
    color: "#ffffff",
    textAlign: "center"
  }
});
