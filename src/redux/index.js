import {
    updateTodo,
    deleteTodo,
    deleteAll
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

    isModalOpen,
    isModalClose,

    isSideBarOpen,
    isSideBarClose,

    setFilter
}