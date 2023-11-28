
const initialState = {
    isSideBarOpen: false,
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {

        case "IS_SIDEBAR_OPEN":
            return {
                ...state,
                isSideBarOpen: true
            }

        case "IS_SIDEBAR_CLOSE":
            return {
                ...state,
                isSideBarOpen: false
            }

        default:
            return state
    }
}

export default modalReducer