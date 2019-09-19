import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import {
    Text,
    View
} from "react-native";
import RNLocation from "react-native-location";

export class Location extends Component {
    constructor() {
        super();
        this.state = {
            location: 0
        }
        RNLocation.configure({
            distanceFilter: 0,
            desiredAccuracy: {
              ios: "bestForNavigation",
              android: "highAccuracy"
            },
            // Android
            androidProvider: "auto",
            interval: 1000,
            fastestInterval: 10000,
            maxWaitTime: 1000,
            // iOS
            activityType: "other",
            allowsBackgroundLocationUpdates: true,
            headingFilter: 1,
            headingOrientation: "portrait",
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
        })
    }

    async componentDidMount() {
        const permission = await RNLocation.checkPermission({
            ios: "whenInUse", // test in ios
            android: {
              detail: "fine"
            }
        })
        if(permission){
            this.startUpdatingLocation();
        }else {
            RNLocation.requestPermission({
                ios: "whenInUse", 
                android: {
                detail: "fine",
                rationale: {
                    title: "We need to access your location",
                    message: "We use your location to update your position",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
                }
            });
        }
    }

    startUpdatingLocation = () => {
        this.updateLocation = RNLocation.subscribeToLocationUpdates( locations => {
            this.setState({ location: locations[0] });
        })
    }

    stopUpdatingLocation = () => {
        this.updateLocation && this.updateLocation()
    }



    render() {
        const { location } = this.state;
        return(
            <Fragment>
                <View>
                    <Text>latitude {location.latitude} </Text>
                    <Text>longitude {location.longitude}</Text>
                </View>
            </Fragment>
        )
    }

    componentWillUnmount() {
        this.stopUpdatingLocation();
    }
}

export default connect()(Location)