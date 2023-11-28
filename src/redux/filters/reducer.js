const initialState = {
    filter: 'Todo'
}

const filterToggleReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_FILTER_TYPE":
            {
                return { ...state, filter: action.payload }
            }

        default:
            return state;
    }
}

export default filterToggleReducer