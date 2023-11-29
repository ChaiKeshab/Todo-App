import { isModalClose, updateTodo, setFilter } from '../redux/index';
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from '../components/index'
import { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { filterType } from '../data/filterType'


const AddTodoModal = ({ modeInfo }) => {

    const dispatch = useDispatch();
    const activeFilter = useSelector(state => state.filterToggleReducer.filter);

    const initialData = modeInfo.title ? modeInfo.title : '';
    const [todoData, setTodoData] = useState(initialData);

    const handleTodoSubmit = (e) => {

        if (e.key === "Enter" || e.type === "click") {

            const { id: oldId, completed: oldComplete } = modeInfo
            const id = oldId ? oldId : crypto.randomUUID()
            const completed = oldComplete ? oldComplete : false

            if (!todoData) return

            const updatedTodos = {
                id,
                title: todoData,
                completed
            }

            if (activeFilter === filterType.Completed && !modeInfo) {
                dispatch(setFilter(filterType.Todo))
            }

            dispatch(updateTodo(updatedTodos))
            dispatch(isModalClose())
        }
    }

    return (
        <>
            <div
                className="TODO z-20 flex items-center justify-center w-full fixed h-screen overflow-hidden bg-black opacity-10"
                onClick={() => dispatch(isModalClose())}
            >
            </div>

            <div className='flex w-[90vw] flex-col justify-center items-center gap-4 p-2 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white opacity-100 rounded-md text-black shadow-[2px_3px_5px_rgba(0,0,0,0.3)]
            md:p-5 md:w-[500px]'>

                <h1 className='w-full border-b border-gray-200 p-3 text-base text-center font-semibold text-gray-600 md:text-2xl'>
                    {!modeInfo ? "Add Todo" : "Edit Todo"}
                </h1>

                <Input
                    placeholder={'Enter your task'}
                    value={todoData}
                    onChange={(e) => setTodoData(e.target.value)}
                    onKeyDown={handleTodoSubmit}
                    className='bg-gray-200 w-[90%] shadow-inner border rounded-md my-5 px-4 py-1 text-sm
                    focus:border-gray-400 md:my-10 md:h-10 md:text-base'
                />

                <div className='flex justify-around w-full gap-2 py-3'>
                    <Button
                        onClick={() => dispatch(isModalClose())}
                        className="group flex justify-center items-center gap-2 text-sm text-white bg-gray-600 px-4 py-0.5 border-gray-500 border rounded-xl
                        focus:bg-gray-200 focus:text-black md:text-base md:px-10 md:py-1"
                        label={'Cancel'}
                    >
                        <FaMinus className="text-sm text-white md:text-base group-hover:text-rose-400" />
                    </Button>

                    <Button
                        onClick={handleTodoSubmit}
                        className="group flex justify-center items-center gap-2 text-sm text-white bg-gray-600 px-4 py-0.5 border-gray-500 border rounded-xl
                        focus:bg-gray-200 focus:text-black md:text-base md:px-10 md:py-1"
                        label={'Confirm'}
                    >
                        <FaPlus className="text-sm text-white md:text-base  group-hover:text-green-400" />
                    </Button>
                </div>

            </div>
        </>
    )
}

export default AddTodoModal 