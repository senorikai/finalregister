import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Todo(props) {

    const [todoname, setTodoname] = useState("")
    const [data, setData] = useState([]);

    const todonameInputChange = (e) => {
        setTodoname(e.target.value);
        console.log(e.target.value)
    }

    const handleDeleteButton = (e) => {
        console.log(e.target.id);
        try {
            const response = axios.post(`/deleteTask/${e.target.id}`)
            getUser();
        }
        catch (error) {
            console.log(error)

        }
    }

    const handleUpdateButton = (e) => {
        console.log('%c 🍬 e: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', e.target.id);
        // console.log(e.target.todoname);
    }

    const handleAddButton = async () => {
        const detail = {
            todoname: todoname,
            userId: props.userId
        }

        if (todoname !== "") {
            setTodoname("");
            let event = await axios.post('/insert', detail)
            if (event.data.Type === "Success") {
                localStorage.setItem("todo", Todo)
                alert("yeey")
                // props.todo(todoname)
            }
            else {
                alert(event.data.Message)
            }
        }
        getUser()
    }

    function getUser() {
        axios.get('/getUser')
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) { return error })
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div class="content">
            <input type="text" id="todo" onChange={todonameInputChange} />
            <button onClick={handleAddButton} style={{ backgroundColor: 'skyblue' }}>+</button>
            <br></br>
            <br></br>
            <button onClick={props.handleLogoutButton}>LOGOUT</button>
            <br></br>
            <br></br>
            <div>
                <table border='1'>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Todo List</th>
                            <th>Actions</th>
                        </tr>
                        {
                            data.length ? 
                            data.map((items) => {
                                return (
                                    <tr>
                                        <td>{items.id}</td>
                                        <td>{items.todoname}</td>
                                        <td>
                                            <button id={items.id} onClick={handleDeleteButton} >DELETE</button>
                                            <button id={items.todoname} onClick={handleUpdateButton}>EDIT</button>
                                        </td>
                                    </tr>
                                )
                            }) :
                            <div>Loading....................</div>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Todo