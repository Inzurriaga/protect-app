export const page = (state = "dashboard", action) => {
    switch(action.type) {
        case "CHANGE_PAGE":
            return action.page;
        default:
            return state;
    }
}