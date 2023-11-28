import * as ActionTypes from "./actionTypes";
import { filterType } from '../../data/filterType'

const initialState = {
    todos: []
};


const myTodoReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.UPDATE_TODO:

            {
                const { id, title, completed } = action.payload
                const doesTodoExist = state.todos.findIndex((todo) => todo.id === id)

                let updatedTodos

                if (doesTodoExist !== -1) {
                    // Todo exists: edit mode
                    updatedTodos = state.todos.map((todo) => {
                        if (todo.id === id) {
                            return {
                                ...todo,
                                title: title !== undefined ? title : todo.title,
                                completed: completed !== undefined ? completed : todo.completed,
                            };
                        }
                        return todo;
                    });
                } else {

                    // Todo doesn't exist: add mode
                    updatedTodos = [...state.todos, { id, title, completed }];
                }

                return { ...state, todos: updatedTodos };
            }





        case ActionTypes.REMOVE_TODO:
            {
                const todoId = action.payload;
                const updatedTodos = state.todos.filter((todo) => todo.id !== todoId);
                return { ...state, todos: updatedTodos };
            }



        case ActionTypes.DELETE_ALL:
            {
                const filter = action.payload
                let updatedTodos
                if (filter === filterType.All) {
                    updatedTodos = []
                } else if (filter === filterType.Completed) {
                    updatedTodos = state.todos.filter((todo) => todo.completed === false)
                    console.log(state.todos[0])
                } else {
                    updatedTodos = state.todos.filter((todo) => todo.completed === true)
                }
                return { ...state, todos: updatedTodos }
            }


        default:
            return state;
    }
};

export default myTodoReducer;