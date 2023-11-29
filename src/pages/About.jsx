import { useDispatch } from "react-redux";
import useWindowResolution from '../hooks/useWindowResolution'
import { RxHamburgerMenu } from "react-icons/rx";
import { isSideBarOpen } from '../redux/index'


const TodoApp = () => {

    const dispatch = useDispatch()
    const windowSize = useWindowResolution();

    const isLgScreen = windowSize.width >= 1024 ? true : false

    return (
        <div className="flex flex-col w-full p-2 mb-5">

            <div className={`${isLgScreen ? 'hidden' : 'flex'} max-h-[10vh] flex items-center py-5 justify-start`}>
                <RxHamburgerMenu
                    onClick={() => dispatch(isSideBarOpen())}
                    className={`${isLgScreen ? 'hidden' : 'block'} text-xl hover:cursor-pointer`}
                />
                <h1 className={`mx-auto text-center text-2xl font-bold md:text-4xl`}>TODO APP</h1>
            </div>


            <div className="bg-gray-100 p-6 rounded-md mb-6">
                <h2 className="text-lg font-semibold mb-2"># Introduction</h2>
                <p className="text-gray-700 text-justify">
                    This is a simple todo app designed for efficient task management. It provides an intuitive interface for creating, editing, and organizing tasks effortlessly.
                </p>
            </div>



            <div className="bg-gray-100 p-6 rounded-md mb-6">
                <h2 className="text-lg font-semibold mb-2"># Features</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Create, edit, and delete tasks</li>
                    <li>Mark tasks as completed</li>
                </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-md mb-6">
                <h2 className="text-lg font-semibold mb-2"># Installation</h2>
                <div>
                    <h3 className="text-md font-semibold mb-1">Prerequisites</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Node.js</li>
                        <li>React.js</li>
                        <li>Vite</li>
                    </ul>
                </div>


                <div className="mt-4">
                    <h3 className="text-md font-semibold mb-1">Steps</h3>
                    <ol className="list-decimal list-inside text-gray-700">
                        <li>
                            Clone the repository:
                            <div className=" bg-gray-200 p-2 my-1 rounded-md">
                                <code className="text-sm">git clone https://github.com/ChaiKeshab/Todo-App.git </code>
                            </div>
                        </li>

                        <li className="mt-3">
                            Install dependencies:
                            <div className=" bg-gray-200 p-2 my-1 rounded-md">

                                <code className="text-sm">
                                    cd [Folder location/Name]
                                </code>

                                <div></div>

                                <code className="text-sm">
                                    npm install
                                </code>

                            </div>
                        </li>



                        <li className="mt-3">
                            Start the application:

                            <ul className="my-2 list-disc list-inside text-gray-700">
                                <li>Create a &quot;.env.local&quot; file in the root folder and copy the followings in it</li>
                            </ul>

                            <div className=" bg-gray-200 whitespace-normal break-words py-2 px-4 rounded-md">
                                <code className="text-sm">
                                    VITE_BASE_URL=&apos;https://jsonplaceholder.typicode.com&apos;
                                </code>

                            </div>

                            <ul className="my-2 list-disc list-inside text-gray-700">
                                <li>Run the application</li>
                            </ul>

                            <div className=" bg-gray-200 my-3 py-2 px-4 rounded-md">
                                <code className="text-sm bg-gray-200 p-1 rounded-md">npm run dev</code>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>



            <div className="bg-gray-100 p-6 rounded-md">
                <h2 className="text-lg font-semibold mb-2"># Usage</h2>

                <ol className="list-decimal my-3 list-inside text-gray-700">
                    <li className="my-4">
                        <strong>Adding a Task:</strong>
                        <ul className="mt-2 list-disc list-inside">
                            <li>Click on the &quot;+ Add&quot; button.</li>
                            <li>Enter your task in the input field and press Enter or click &quot;Confirm&quot; to add it to the list.</li>
                        </ul>
                    </li>

                    <li className="my-4">
                        <strong>Marking a Task as Complete:</strong>
                        <ul className="mt-2 list-disc list-inside">
                            <li>Click on the checkbox or task itself to mark it as completed.</li>
                        </ul>
                    </li>

                    <li className="my-4">
                        <strong>Editing or Deleting a Task:</strong>
                        <ul className="mt-2 list-disc list-inside">
                            <li>To edit, click on the edit icon and modify it. Press Enter or click &quot;Confirm&quot; to save changes.</li>
                            <li>To delete, click on the delete icon next to edit button.</li>
                            <li>To delete all, click on the &quot; - Delete All&quot; button.</li>
                        </ul>
                    </li>

                    <li className="my-4">
                        <strong>Additional Functionality:</strong>
                        <ul className="mt-2 list-disc list-inside">
                            <li>Explore additional features like filtering tasks based on status.</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default TodoApp;
