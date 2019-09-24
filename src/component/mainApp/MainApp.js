import React, { Component } from "react";
import { 
    View,
    StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { BottomNavigation } from "react-native-material-ui";
import Dashboard from "../dashboard/Dashboard";
import TeamDashboard from "../teamsDashboard/TeamsDashboard";
import Data from "../data/Data"
import { changePage } from "../../action";

export class MainApp extends Component {
    render() {
        const { page, changePage } = this.props;
        return(
            <View style={styles.mainApp}>
                { page === "dashboard" ? <Dashboard /> : null }
                { page === "teamsDashboard" ? <TeamDashboard /> : null }
                { page === "data" ? <Data /> : null }
                <BottomNavigation>
                    <BottomNavigation.Action 
                            key="person"
                            icon="person"
                            label="Personal vital's"
                            onPress={() => changePage("dashboard")}/>
                    <BottomNavigation.Action 
                            key="people"
                            icon="people"
                            label="Team vital's"
                            onPress={() => changePage("teamsDashboard")}/>
                        <BottomNavigation.Action 
                            key="data"
                            icon="show-chart"
                            label="data"
                            onPress={() => changePage("data")}/>
                </BottomNavigation>
            </View>
        )
    }
}

export const mapStateToProps = (state) => ({
    page: state.page
})

export const mapDispatchToProps = (dispatch) => ({
    changePage: page => dispatch(changePage(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)

const styles = StyleSheet.create({
    mainApp: {
        flex: 1,
    }
})



