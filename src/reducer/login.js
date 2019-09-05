export const login = (state = true, action) => {
  switch(action.type) {
    case "LOGIN":
      return action.bool;
    default: 
      return state;
  }
}