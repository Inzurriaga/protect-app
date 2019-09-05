import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import { Provider } from "react-redux";
import { createStore } from "redux";
import Header from "../header/Header";
import Login from "../login/Login";
import { rootReducer } from "../../reducer/rootReducer"

const store = createStore( rootReducer )
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <SafeAreaView>
          <Header />
          <Login />
        </SafeAreaView>
      </Fragment>
    </Provider>
  );
};

const styles = StyleSheet.create({
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

export default App
