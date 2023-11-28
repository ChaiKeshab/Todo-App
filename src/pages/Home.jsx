import { useState, useMemo, useEffect } from "react";
import { Input, Button } from '../components/index';
import { useSelector, useDispatch } from "react-redux";
import { isSideBarOpen } from '../redux/index';
import useWindowResolution from '../hooks/useWindowResolution'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import {
    updateTodo,
    deleteTodo,
    deleteAll,
    isModalOpen,
    isModalClose
} from '../redux/index'
import AddTodoModal from '../layout/AddTodoModal'
import { useQuery } from "@tanstack/react-query";
import { getTodosAPI } from '../APIs/todoApi'


const Home = () => {

    const dispatch = useDispatch()
    const windowSize = useWindowResolution();

    const myTodos = useSelector((state) => state.myTodoReducer.todos)
    const sidebarStatus = useSelector(state => state.sidebarToggleReducer.isSideBarOpen);
    const modalTrigger = useSelector(state => state.modalToggleReducer.isModalOpen);
    const activeFilter = useSelector(state => state.filterToggleReducer.filter);

    const filterType = {
        Todo: "Todo",
        Completed: "Completed",
        All: "All"
    };

    const isLgScreen = windowSize.width >= 1024 ? true : false


    const { data: apiTodo, isPending } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodosAPI,
        staleTime: Infinity
    })
    /**
     * Integrating apiTodo with local todo:
     * 
     * first time load, apiTodo will be present. 
     * (say) i removed them and now added my own todos WHICH! will be stored in redux local storage now.
     * when page reload || next time visit, display redux todo BUT! we also got api todo that's gonna join the show
     * 
     * IDK who came up with this idea but BRO!!! wtf
     */

    const [searchTodo, setSearchTodo] = useState('')


    const filteredTodo = myTodos?.filter((todo) => {
        const formattedName = todo.toLowerCase()
        return formattedName.includes(searchTodo.toLowerCase())
    })

    return (
        <>
            <div className="min-h-screen w-full px-3 md:px-7">

                <div className={`${isLgScreen ? 'hidden' : 'flex'} min-h-[5vh] flex items-center py-5 justify-start`}>
                    <RxHamburgerMenu
                        onClick={() => dispatch(isSideBarOpen())}
                        className={`${isLgScreen ? 'hidden' : 'block'} text-xl`}
                    />
                    <h1 className={`mx-auto text-center text-2xl font-bold md:text-4xl`}>TODO</h1>
                </div>


                <div className='flex py-2 w-full lg:py-6'>

                    <Input
                        placeholder={'Search'}
                        value={searchTodo}
                        onChange={(e) => setSearchTodo(e.target.value)}
                        className='bg-[#F1F1F1] w-full shadow-inner border rounded-md px-4 py-2 h-9
                        focus:border-gray-400 md:h-12'
                    />

                </div>

                <Button
                    onClick={() => dispatch(isModalOpen())}
                    className="mt-3 text-white bg-green-500 px-2 py-1 rounded-md flex justify-center items-center gap-2 shadow-md
                    hover:bg-green-400 md:text-xl md:px-3 md:py-2"
                    label={'Add'}
                >
                    <FaPlus className="text-base text-white md:text-2xl" />
                </Button>

            </div>


            {modalTrigger &&
                <AddTodoModal />
            }
        </>
    )
}

export default Home