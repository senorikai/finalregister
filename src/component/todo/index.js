import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './todo.css'


function Todo(props) {

    const [todoname, setTodoname] = useState("")
    const [data, setData] = useState([]);
    const [todonameEdit, setTodonameEdit] = useState("")
    const [selectedTodoId, setSelectedTodoId] = useState(" ");


    const todonameInputChange = (e) => {
        setTodoname(e.target.value);
    }

    const todonameEditInputChange = (e) => {
        setTodonameEdit(e.target.value);
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


    const handlerSelectedTodo = (e) => {
        setTodonameEdit(e.todoname)
        setSelectedTodoId(e.id)

    }

    const handleCancelButton = (e) => {
        setSelectedTodoId(" ")
    }

    const handleSaveButton = (e) => {
        setTodoname(" ");
        const { id, name } = e.target
        axios.post('/TodoUpdate', { id: id, todoname: name })
            .then(function (response) {
                getUser()
                setSelectedTodoId(" ")
            })
            .catch(function (error) { return error })
    }

    const handleAddButton = async () => {
        const detail = {
            todoname: todoname,
            userId: props.userId
        }
        if (todoname !== "") {
            const event = await axios.post('/insert', detail)
            if (event.data.Type === "Success") {
                setTodoname("");
                localStorage.setItem("todo", Todo)
            }
            else {
                alert(event.data.Message)
            }
        }
        getUser()
    }

    function getUser() {
        axios.get(`/users/${props.userId}/todos`)
            .then(function (response) {
                setData(response.data);

            })
            .catch(function (error) { return error })
    }

    // function getTodoName(id) {
    //     axios.get(`/getTodo/${id}`)
    //         .then(function (response) {
    //             setTodoname(response.todoname);
    //         })
    //         .catch(function (error) { return error })
    // }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div class="content">
            <div class="todowrapper">
                <body id="container">
                    <div>
                        <div class="card" >
                            <div class="card-body">
                                <h5 class="card-title">{localStorage.getItem("username")}'s</h5>
                                <p class="card-text">TODO LIST</p>
                                <a href="#" onClick={props.handleLogoutButton} class="btn btn-danger">LOGOUT</a>
                            </div>
                        </div>
                        <br />

                        <div class="input-group mb-3">
                            <input onChange={todonameInputChange} value={todoname} type="text" class="form-control" />
                            <button onClick={handleAddButton} type="button" class="btn btn-success"><i class="fas fa-plus"></i></button>

                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Todo List</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.length
                                                    ?
                                                    data.map((items) => {
                                                        return (
                                                            <tr>
                                                                <td id={items.id} onClick={() => handlerSelectedTodo(items)}> {selectedTodoId === items.id ?
                                                                    <input class="form-control" type="text" id={items.id} value={todonameEdit} onChange={todonameEditInputChange}></input>
                                                                    : items.todoname}
                                                                </td>
                                                                <td>
                                                                    {selectedTodoId === items.id ?
                                                                        <div>
                                                                            <button className="btn btn-outline-success" id={selectedTodoId} name={todonameEdit} onClick={handleSaveButton}>SAVE</button>
                                                                            <button className="btn btn-outline-warning" onClick={handleCancelButton}>CANCEL</button>
                                                                        </div>
                                                                        : <button type="button" id={items.id} onClick={handleDeleteButton} className="btn btn-outline-danger">DELETE</button>}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <td>No available todo</td>

                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </div>
        </div>
    )
}

export default Todo