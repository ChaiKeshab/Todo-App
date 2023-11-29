import { useNavigate } from "react-router-dom";
import { Button } from '../components/index'
import { filterType } from '../data/filterType'
import { useDispatch } from "react-redux";
import { setFilter } from '../redux/index'

const TodoApp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className=" flex flex-col h-screen overflow-x-auto w-full pl-3 pb-5 mt-4 md:pl-7">

            <Button
                onClick={() => {
                    navigate('/')
                    dispatch(setFilter(filterType.Todo))
                }}

                className=" px-4 py-2 bg-blue-400 w-fit text-white rounded-md"
                label={'Home'}
            />

            <h1 className="text-3xl font-bold mb-4 text-center"># Simple Todo App</h1>

            <div className="bg-gray-100 p-6 rounded-md mb-6">
                <h2 className="text-lg font-semibold mb-2"># Introduction</h2>
                <p className="text-gray-700">
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
                            <pre>
                                <code className="text-sm bg-gray-200 p-1 rounded-md">git clone https://github.com/ChaiKeshab/Todo-App.git</code>
                            </pre>
                        </li>
                        <li>
                            Install dependencies:
                            <pre>
                                <code className="text-sm bg-gray-200 p-1 rounded-md">
                                    cd todo-app
                                    npm install
                                </code>
                            </pre>
                        </li>
                        <li>
                            Start the application:
                            <pre>
                                <code className="text-sm bg-gray-200 p-1 rounded-md">npm run dev</code>
                            </pre>
                        </li>
                    </ol>
                </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-md">
                <h2 className="text-lg font-semibold mb-2"># Usage</h2>
                <ol className="list-decimal list-inside text-gray-700">
                    <li>
                        <strong>Adding a Task:</strong>
                        <ul className="list-disc list-inside">
                            <li>Click on the "+ Add" button.</li>
                            <li>Enter your task in the input field and press Enter or click "Confirm" to add it to the list.</li>
                        </ul>
                    </li>
                </ol>
            </div>

            <div className='text-3xl'>
                And yes this page is GPT generated cuz i am bored now.
            </div>
        </div>
    );
};

export default TodoApp;
