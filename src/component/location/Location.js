import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import {
    Text,
    View,
    StyleSheet
} from "react-native";
import RNLocation from "react-native-location";
import MapboxGL  from "@react-native-mapbox-gl/maps";
import {REACT_APP_API_MAP} from "react-native-dotenv";

MapboxGL.setAccessToken(REACT_APP_API_MAP);

export class Location extends Component {
    constructor() {
        super();
        this.state = {
            location: {
                longitude: 0,
                latitude: 0
            }
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
        MapboxGL.setTelemetryEnabled(false);
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
                <View style={styles.locationContainer}>
                    <MapboxGL.MapView  style={styles.map}>
                    <MapboxGL.Camera
                        zoomLevel={15}
                        centerCoordinate={[ location.longitude, location.latitude ]}
                    />
                    <MapboxGL.UserLocation 
                        animated={true}
                    />
                    </MapboxGL.MapView>
                    <View style={styles.sensorContainer}>
                        <View style={styles.sensorData}>
                            <Text style={styles.sensorDataText}>{location.latitude} </Text>
                            <Text style={styles.DataTypeText}>latitude</Text>
                        </View>
                        <View style={styles.sensorData}>
                            <Text style={styles.sensorDataText}>{location.longitude}</Text>
                            <Text style={styles.DataTypeText}>longitude</Text>
                        </View>
                    </View>
                </View>
            </Fragment>
        )
    }

    componentWillUnmount() {
        this.stopUpdatingLocation();
    }
}

export default connect()(Location)

const styles = StyleSheet.create({
    locationContainer: {
        flex: 1,
        elevation: 1,
        borderRadius: 25,
        margin: 10,
        backgroundColor: "#ffffff",
        overflow: "hidden"
    },
    sensorContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    sensorData: {
         padding: 20
    },
    sensorDataText: {
        fontSize: 30,
        color: "#000000"
    },
    DataTypeText: {
        textAlign: "center",
        color: "#000000"
    },
    map: {
        flex: 1,
    }
  });