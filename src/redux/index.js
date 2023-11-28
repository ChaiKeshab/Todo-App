import {
    updateTodo,
    deleteTodo,
    deleteAll,
    selectAll
} from './todos/action'

import {
    isModalOpen,
    isModalClose
} from './modal/action'

import {
    isSideBarOpen,
    isSideBarClose
} from './sidebar/action'

import { setFilter } from './filters/action'

export {
    updateTodo,
    deleteTodo,
    deleteAll,
    selectAll,

    isModalOpen,
    isModalClose,

    isSideBarOpen,
    isSideBarClose,

    setFilter
}