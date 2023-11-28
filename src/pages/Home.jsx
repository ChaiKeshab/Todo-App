import { useState, useMemo, useEffect } from "react";
import { Input, Button, Checkbox } from '../components/index';
import { useSelector, useDispatch } from "react-redux";
import useWindowResolution from '../hooks/useWindowResolution'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import {
    updateTodo,
    deleteTodo,
    deleteAll,
    isModalOpen,
    isSideBarOpen
} from '../redux/index'
import AddTodoModal from '../layout/AddTodoModal'
import { useQuery } from "@tanstack/react-query";
import { getTodosAPI } from '../APIs/todoApi'
import { filterType } from '../data/filterType'


const Home = () => {

    const dispatch = useDispatch()
    const windowSize = useWindowResolution();

    const myTodos = useSelector((state) => state.myTodoReducer.todos)
    // const sidebarStatus = useSelector(state => state.sidebarToggleReducer.isSideBarOpen);
    const modalTrigger = useSelector(state => state.modalToggleReducer.isModalOpen);
    const activeFilter = useSelector(state => state.filterToggleReducer.filter);


    const isLgScreen = windowSize.width >= 1024 ? true : false


    const { data: apiTodos, isFetched } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodosAPI,
        staleTime: Infinity
    })

    /**
     * Integrating apiTodo with local todo:
     * 
     * first-time load: apiTodo will be present. 
     * (say) i removed them and now added my own todos WHICH! will now be stored in redux local storage (redux persist).
     * when page reload || next time visit, display redux todo BUT! we also got api todo that's gonna join the show
     * 
     * IDK who came up with this idea but BRO!!! wtf
     */


    useEffect(() => {
        if (isFetched && apiTodos) {
            apiTodos.map(todo => {
                dispatch(updateTodo(todo));
            })
        }
    }, [dispatch, isFetched, apiTodos]);


    // if '' then addMode, else editMode and i send id. 
    const [isAddMode, setIsAddMode] = useState('')
    const [searchTodo, setSearchTodo] = useState('')


    const filteredTodo = useMemo(() => {
        const { All, Completed, Todo } = filterType

        return myTodos?.filter((todo) => {
            if (activeFilter === All) return todo
            else if (activeFilter === Completed) return todo.completed === true
            else if (activeFilter === Todo) return todo.completed === false
        })
    }, [activeFilter, myTodos])


    const displayTodo = useMemo(() => {
        return filteredTodo?.filter((todo) => {
            const formattedName = todo?.title.toLowerCase()
            return formattedName.includes(searchTodo.toLowerCase())
        })
    }, [filteredTodo, searchTodo])


    const checkboxChange = (id, completed) => {
        const updatedData = {
            id,
            completed
        }
        dispatch(updateTodo(updatedData))
    }

    return (
        <>
            <div className="relative flex flex-col h-screen overflow-hidden w-full pl-3 pb-2 md:pl-7">

                <div className={`${isLgScreen ? 'hidden' : 'flex'} h-[10vh] flex items-center py-5 justify-start`}>
                    <RxHamburgerMenu
                        onClick={() => dispatch(isSideBarOpen())}
                        className={`${isLgScreen ? 'hidden' : 'block'} text-xl hover:cursor-pointer`}
                    />
                    <h1 className={`mx-auto text-center text-2xl font-bold md:text-4xl`}>TODO</h1>
                </div>


                <div className='h-[20vh] p-2 pr-7 w-full border-y border-gray-300'>

                    <Input
                        placeholder={'Search'}
                        value={searchTodo}
                        onChange={(e) => setSearchTodo(e.target.value)}
                        className='bg-[#F1F1F1] w-full shadow-inner border rounded-md px-4 py-2 h-9
                        focus:border-gray-400 md:h-12 mt-4'
                    />

                    <div className="flex gap-4">
                        <Button
                            onClick={() => {
                                dispatch(isModalOpen())
                                setIsAddMode('')
                            }}

                            className="text-white bg-green-500 px-2 py-1 mt-5 rounded-md flex justify-center items-center gap-2 shadow-md
                            hover:bg-green-400 md:text-xl md:px-3 md:py-2"
                            label={'Add'}
                        >
                            <FaPlus className="text-base text-white md:text-2xl" />
                        </Button>


                        <Button
                            onClick={() => dispatch(deleteAll(activeFilter))}
                            className="text-white bg-rose-500 px-2 py-1 mt-5 rounded-md flex justify-center items-center gap-2 shadow-md
                            hover:bg-rose-400 md:text-xl md:px-3 md:py-2"
                            label={'Delete All'}
                        >
                            <FaMinus className="text-base text-white md:text-2xl" />
                        </Button>

                    </div>
                </div>


                <div className="h-[80vh] flex flex-col gap-2 mt-1 flex-grow overflow-x-auto md:h-[70vh]">
                    {displayTodo?.slice().reverse().map((todo, index) => (

                        <label
                            htmlFor={todo.id}
                            key={todo.id}
                            className="flex border justify-between items-start min-w-100 hover:bg-teal-100"
                        >

                            <div className="flex px-2 mt-1 items-start w-fit gap-1 ">
                                <Checkbox
                                    type={'checkbox'}
                                    value={todo.title}
                                    id={todo.id}
                                    name={todo.title}
                                    checked={todo.completed}
                                    className={'mt-1.5'}
                                    onChange={() => checkboxChange(todo.id, !todo.completed)}
                                />

                                <div className={`${todo.completed ? 'line-through' : 'no-underline'} w-fit ml-2 text-left text-sm md:text-base`}>
                                    {index + 1}.
                                </div>
                                <div className={`${todo.completed ? 'line-through' : 'no-underline'} w-fit ml-2 text-left text-sm md:text-base`}>
                                    {todo.title}
                                </div>
                            </div>



                            <div className='flex gap-3 md:mr-5'>
                                <Button
                                    onClick={() => {
                                        dispatch(isModalOpen())
                                        setIsAddMode({
                                            id: todo.id,
                                            title: todo.title,
                                            completed: todo.completed
                                        })
                                    }}

                                    className=" text-slate-600 rounded-md min-w-fit p-2"
                                    type={'button'}
                                >
                                    <FaRegEdit className="text-sm md:text-base" />
                                </Button>

                                <Button
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                    className=" text-slate-600 rounded-md min-w-fit p-2"
                                    type={'button'}
                                >
                                    <IoTrashBin className="text-sm md:text-base" />
                                </Button>

                            </div>
                        </label>
                    ))}
                </div>

            </div>


            {modalTrigger &&
                <AddTodoModal
                    modeInfo={isAddMode}
                />
            }
        </>
    )
}

export default Home