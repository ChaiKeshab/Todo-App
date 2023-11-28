import * as ActionTypes from "./actionTypes";


export const updateTodo = (todo) => ({
    type: ActionTypes.UPDATE_TODO,
    payload: todo,
});

export const deleteTodo = (todo) => ({
    type: ActionTypes.REMOVE_TODO,
    payload: todo
});

export const deleteAll = (todo) => ({
    type: ActionTypes.DELETE_ALL,
    payload: todo
});

export const selectAll = (todo) => ({
    type: ActionTypes.SELECT_ALL,
    payload: todo
});




// export const addTodo = (todo) => ({
//     type: ActionTypes.CREATE_TODO,
//     payload: todo,
// });