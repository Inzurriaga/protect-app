import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Picker,
    ScrollView,
    Dimensions
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    Button
} from "react-native-material-ui";

export default class Data extends Component {
    constructor() {
        super();
        this.state = {
            showDate: false
        }
    }

    setDate = () => {
        this.setState({
            showDate: false
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.dataSettings}>
                    <Picker style={styles.picker}>
                        <Picker.Item label="Heart Rate" value="hello"/>
                        <Picker.Item label="SPO2" value="hello"/>
                        <Picker.Item label="Temperature" value="hello"/>
                        <Picker.Item label="CO2" value="hello"/>
                        <Picker.Item label="CO" value="hello"/>
                        <Picker.Item label="H2S" value="hello"/>
                    </Picker>
                    <Button 
                        icon="date-range"
                        text=""
                        style={styles.button}
                        onPress={() => this.setState({
                            showDate: true
                        })}
                    >
                    </Button>
                </View>
                <ScrollView>

                </ScrollView>
                {
                    this.state.showDate && <DateTimePicker value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
                }
                <Text>hello im data</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dataSettings: {
        height: 80,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: Dimensions.get("window").width
    },
    picker: {
        flex: 1
    },
    button: {
        height: 50,
        width: 50,
        alignItems: "center"
    }
})
