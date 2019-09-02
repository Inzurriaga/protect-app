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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const App = () => {
  return (
    <Fragment>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.header_title}>Tech To Protect</Text>
        </View>
        <View>
          <Text>hello</Text>
        </View>
      </SafeAreaView>
    </Fragment>
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

export default App;
