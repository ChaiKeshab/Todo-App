import { useState, useMemo, useEffect } from "react";
import { Input, Button } from '../components/index';


const Home = () => {

    const stored = localStorage.getItem('notes');
    const [notes, setNotes] = useState(stored ? JSON.parse(stored) : []);

    const [addNote, setAddNote] = useState({ title: "", status: false, _id: '' });
    const [editNote, setEditNote] = useState({ id: null, title: "" });

    const [userSearch, setUserSearch] = useState('')


    const [choice, setChoice] = useState('Todo')

    //-------------------------------------------------------------Search------------------------------------------------------

    const handleSearch = (e) => {
        setUserSearch(e.target.value)
    }

    const handleFilters = (event) => {
        if (event === 'All') setChoice('All')
        else if (event === 'Completed') setChoice('Completed')
        else if (event === 'Todo') setChoice('Todo')
    }

    const radioFilteredItems = useMemo(() => {
        return notes.filter((e) => {
            if (choice === "All") return e
            else if (choice === "Completed") return e.status === true
            else if (choice === "Todo") return e.status === false
        })
    }, [notes, choice])

    const userFilteredItems = useMemo(() => {
        return radioFilteredItems.filter((e) => {
            return e.title.toLowerCase().includes(userSearch.toLowerCase())
        })
    }, [userSearch, radioFilteredItems])



    //-------------------------------------------------------------Note-CRUD------------------------------------------------------

    const handleChange = (e) => {
        if (editNote.id !== null) {     // edit mode,
            setEditNote({ ...editNote, title: e.target.value });
        } else {    // add mode,
            //generate id cuz index is unreliable
            const idGen = Math.random().toString(36).substring(2);
            setAddNote({
                ...addNote,
                [e.target.name]: e.target.value,
                _id: idGen
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editNote.id !== null) {        //for editing 
            const updatedNotes = notes.map((note) => {
                if (note._id === editNote.id) {
                    return { ...note, title: editNote.title };
                }
                return note;
            });

            setNotes(updatedNotes);
            setEditNote({ id: null, title: "" });
            const data = JSON.stringify(updatedNotes);
            localStorage.setItem('notes', data);

        } else { //for adding
            if (addNote.title !== '') {

                setNotes([...notes, addNote]);
                setAddNote({ title: "", status: false, _id: '' });

                const data = JSON.stringify([...notes, addNote]);
                localStorage.setItem('notes', data);
            }
        }
    }

    const handleDeleteNote = (id) => {
        const deletedNotes = notes.filter((elm) => elm._id !== id);
        setNotes(deletedNotes);
        const data = JSON.stringify(deletedNotes);
        localStorage.setItem('notes', data);
    }

    const handleEditNote = (id, title) => {
        //storing id to remove it's null and trigger editfeatures
        setEditNote({ id: id, title });
    }

    const handleComplete = (id, status) => {
        //updating status [checkbox]
        const updatedNotes = notes.map((e) => {
            if (e._id === id) {
                return { ...e, status: !status };
            }
            return e;
        });

        setNotes(updatedNotes);

        const data = JSON.stringify(updatedNotes);
        localStorage.setItem('notes', data);

    }


    const selectAll = (e) => {
        const { checked } = e.target

        if (checked) {
            const updatedNotes = notes.map((e) => {
                console.log(e.status, 'select')
                return {
                    ...e,
                    "status": true
                }
            })

            setNotes(updatedNotes);


            const data = JSON.stringify(updatedNotes);
            localStorage.setItem('notes', data);
        } else {
            const updatedNotes = notes.map((e) => {
                console.log(e.status, 'select')
                return {
                    ...e,
                    "status": false
                }
            })

            setNotes(updatedNotes);


            const data = JSON.stringify(updatedNotes);
            localStorage.setItem('notes', data);
        }
    }

    const deleteAll = () => {
        if (choice === "All") {
            setNotes([])



        } else if (choice === "Completed") {
            const abc = notes.filter((val) => val.status !== true)
            setNotes(abc)


        } else {
            const abc = notes.filter((val) => val.status === true)
            setNotes(abc)

        }




    }

    useEffect(() => {
        const data = JSON.stringify(notes);
        localStorage.setItem("notes", data)
    }, [notes])



    return (

        <div className=" bg-white min-h-fit rounded-4 shadow-md mt-20 rounded mx-auto max-w-lg">

            <div className="flex place-content-between border-b">
                <Button type={'button'}
                    value={'Todo'}
                    className={`${choice === 'Todo' ? 'bg-blue-700 text-white py-2' : 'bg-white text-black'} rounded hover:bg-slate-100 hover:text-black w-full`}
                    onClick={() => handleFilters('Todo')}
                />
                <Button type={'button'}
                    value={'Completed'}
                    className={`${choice === 'Completed' ? 'bg-blue-700 text-white  py-2' : 'bg-white text-black'} rounded hover:bg-slate-100 hover:text-black w-full`}
                    onClick={() => handleFilters('Completed')}
                />
                <Button type={'button'}
                    value={'All'}
                    className={`${choice === 'All' ? 'bg-blue-700 text-white  py-2' : 'bg-white text-black'} rounded hover:bg-slate-100 hover:text-black w-full`}
                    onClick={() => handleFilters('All')}
                />
            </div>



            <div className="w-full flex items-center justify-between px-10 mt-7 flex-wrap md:flex-nowrap">
                <Input
                    className_div={'flex items-center'}
                    className_l={'ml-2'}
                    type={'checkbox'}
                    value={'selectAll'}
                    id={'selectAll'}
                    name={'selectAll'}
                    onChange={(e) => selectAll(e)}
                    label={'select all'}
                    className="w-4 h-4"
                />

                <button
                    className={"bg-red-500 mt-5 md:mt-0  hover:bg-red-700 text-white rounded-md w-24 text-sm px-3 py-3"}
                    onClick={deleteAll}> Delete all</button>

            </div>


            <div className="px-10 bg-white shadow-md rounded mx-auto max-w-lg py-5">

                <div className="w-auto place-content-center my-4">
                    <form
                        className="flex items-center justify-between my-2"
                        action=""
                        onSubmit={handleSubmit}>
                        <Input
                            className_div={"flex items-center gap-x-3 w-full"}
                            className="w-full border rounded-md p-2 my-1 outline-none"
                            value={editNote.id !== null ? editNote.title : addNote.title}
                            onChange={(e) => handleChange(e)}
                            placeholder={'Enter your Todos'}
                            name={'title'}
                            id={'title'}

                        />
                        <Button type={'submit'}
                            className={"bg-blue-500 py-2 hover:bg-blue-700 text-white rounded-md w-fit px-5"}
                            value={editNote.id !== null ? 'Edit' : 'Submit'} />
                    </form>
                </div>


                <div>

                    {/* <div className='flex-1 rounded-md my-5 outline-none'> */}
                    <div className="flex place-content-center my-2">

                        <Input
                            className_div={"flex items-center gap-x-3 w-full"}
                            className={'flex-1 border rounded-md p-2 my-1 outline-none'}
                            value={userSearch}
                            name={'userSearch'}
                            id={'userSearch'}
                            placeholder={'Search'}
                            onChange={handleSearch}
                        />

                    </div>


                    <div className={'flex flex-col gap-1 w-full mt-5'}>

                        {userFilteredItems.length > 0 ?
                            userFilteredItems.map((e, i) => (

                                <div className="flex border place-content-between items-center min-w-100" key={i}>

                                    <div className="flex flex-row flex-1 px-2 items-center gap-1 ">
                                        <Input
                                            type={'checkbox'}
                                            value={'Completed'}
                                            id={'checkbox'}
                                            name={'checkbox'}
                                            checked={e.status}
                                            onChange={() => handleComplete(e._id, e.status)}
                                        />
                                        <p className={`${choice === 'Completed' ? 'line-through' : 'no-underline'} w-fit ml-2 text-left`}>{e.title}</p>
                                    </div>

                                    <div className='flex'>
                                        <button
                                            className=" text-slate-600 rounded-md min-w-fit m-2"
                                            type={'button'}
                                            onClick={() => handleEditNote(e._id, e.title)}
                                        >
                                            nyah
                                        </button>

                                        <button
                                            className=" text-slate-600 rounded-md min-w-fit m-2"
                                            type={'button'}
                                            onClick={() => handleDeleteNote(e._id)}
                                        >
                                            nekko
                                        </button>
                                    </div>
                                </div>
                            ))
                            : <></>}
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Home;
