export const login = (state = false, action) => {
  switch(action.type) {
    case "LOGIN":
      return action.bool;
    default: 
      return state;
  }
}