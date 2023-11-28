import * as ActionTypes from "./actionTypes";


export const updateTodo = (todo) => ({
    type: ActionTypes.UPDATE_TODO,
    payload: todo,
});

export const deleteTodo = (todo) => ({
    type: ActionTypes.REMOVE_TODO,
    payload: todo
});

export const deleteAll = (activeFilter) => ({
    type: ActionTypes.DELETE_ALL,
    payload: activeFilter
});