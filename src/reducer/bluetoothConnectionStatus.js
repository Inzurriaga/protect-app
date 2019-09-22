export const bluetoothConnectionStatus = (state = false, action) => {
    switch(action.type) {
        case "BLUETOOTH_CONNECTION":
            return action.bool;
        default:
            return state;
    }
}