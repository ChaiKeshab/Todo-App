import { combineReducers } from "redux";
import MyTodoReducer from './todos/reducer'
import filterToggleReducer from './filters/reducer'
import modalToggleReducer from './modal/reducer'
import sidebarToggleReducer from './sidebar/reducer'

const rootReducer = combineReducers({
    myTodoReducer: MyTodoReducer,
    filterToggleReducer: filterToggleReducer,
    modalToggleReducer: modalToggleReducer,
    sidebarToggleReducer: sidebarToggleReducer
})

export default rootReducer