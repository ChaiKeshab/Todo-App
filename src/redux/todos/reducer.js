import * as ActionTypes from "./actionTypes";

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
                                title: title ? title : todo.title,
                                completed: completed ? completed : todo.completed,
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
                return { ...state, todos: [] }
            }


        default:
            return state;
    }
};

export default myTodoReducer;