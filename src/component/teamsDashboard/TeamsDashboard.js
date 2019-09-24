import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

export default class TeamsDashboard extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>hello this is the team dashboard</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

