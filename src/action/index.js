export const toggleLogin = (bool) => ({
  type: "LOGIN",
  bool
})

export const locationUpdate = (lat, long) => ({
  type: "LOCATION_UPDATE",
  lat,
  long
})

export const bluetoothConnection = (bool) => ({
  type: "BLUETOOTH_CONNECTION",
  bool
})

export const changePage = (page) => ({
  type: "CHANGE_PAGE",
  page
}) 