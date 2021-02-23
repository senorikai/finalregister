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


    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="content">
            <div className="todowrapper">
                <body id="container">
                    <div>
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">{localStorage.getItem("username")}'s</h5>
                                <p className="card-text">TODO LIST</p>
                                <a href="#" onClick={props.handleLogoutButton} className="btn btn-danger">LOGOUT</a>
                            </div>
                        </div>
                        <br />

                        <div className="input-group mb-3">
                            <input onChange={todonameInputChange} value={todoname} type="text" className="form-control" />
                            <button onClick={handleAddButton} type="button" className="btn btn-success"><i className="fas fa-plus"></i></button>

                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <table className="table table-bordered">
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
                                                                    <input className="form-control" type="text" id={items.id} value={todonameEdit} onChange={todonameEditInputChange}></input>
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