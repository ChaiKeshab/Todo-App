import { isSideBarOpen, isSideBarClose, setFilter } from '../redux/index';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/index';
import { useEffect } from 'react';
import useWindowResolution from '../hooks/useWindowResolution';
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
    const dispatch = useDispatch();
    const sidebarStatus = useSelector(state => state.sidebarToggleReducer.isSideBarOpen);
    const activeFilter = useSelector(state => state.filterToggleReducer.filter);
    const windowSize = useWindowResolution();

    const filterType = {
        Todo: "Todo",
        Completed: "Completed",
        All: "All"
    };

    const isLgScreen = windowSize.width >= 1024 ? true : false

    useEffect(() => {

        if (isLgScreen && !sidebarStatus) {
            dispatch(isSideBarOpen());
        }

    }, [dispatch, isLgScreen, sidebarStatus]);


    return (
        <>
            <aside
                className={`${sidebarStatus ? "translate-x-0" : "-translate-x-full"} bg-white border-r
                fixed left-0 p-2 top-0 pb-10 h-screen w-[70%] transform z-20 ease-in-out duration-500 shadow-[2px_3px_5px_rgba(0,0,0,0.3)]
                md:w-[40%] md:px-5 lg:w-[500px] lg:sticky lg:shadow-none lg:duration-0 lg:border-gray-300`}
            >

                <div className='min-h-[5vh] flex items-center p-5 justify-end'>
                    <h1 className={`${isLgScreen ? 'block' : 'hidden'} mx-auto text-center text-4xl font-bold`}>TODO</h1>

                    <IoMdClose
                        onClick={() => dispatch(isSideBarClose())}
                        className={`${isLgScreen ? 'hidden' : 'block'} text-xl`}
                    />
                </div>

                <div className='flex flex-col gap-2 py-2 items-start justify-start border-y border-gray-200'>

                    <Button
                        onClick={() => dispatch(setFilter(filterType.Todo))}
                        label={'Todo'}
                        className={`${activeFilter === filterType.Todo ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-blue-400'}
                        w-full text-left py-2 px-6 rounded-full hover:text-white md:text-xl md:py-4 md:px-12`}
                    />

                    <Button
                        onClick={() => dispatch(setFilter(filterType.Completed))}
                        label={'Completed'}
                        className={`${activeFilter === filterType.Completed ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-blue-400'}
                        w-full text-left py-2 px-6 rounded-full hover:text-white md:text-xl md:py-4 md:px-12`}
                    />

                    <Button
                        onClick={() => dispatch(setFilter(filterType.All))}
                        label={'All'}
                        className={`${activeFilter === filterType.All ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-blue-400'}
                        w-full text-left py-2 px-6 rounded-full hover:text-white md:text-xl md:py-4 md:px-12`}
                    />

                </div>

            </aside>

            {sidebarStatus && (
                <div
                    className="BACKGROUND lg:hidden z-10 w-full fixed h-screen overflow-hidden bg-black opacity-10"
                    onClick={() => dispatch(isSideBarClose())}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
