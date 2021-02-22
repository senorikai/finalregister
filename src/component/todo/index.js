import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


function Todo(props) {

    const [todoname, setTodoname] = useState("") 
    const [idSave, setidSave] = useState("");
    const [data, setData] = useState([]);
    const [isEdit, setisEdit] = useState(false);
    const [todonameEdit,setTodonameEdit] = useState("")
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


    const handlerSelectedTodo = (e) =>
    {
        console.log("task",e.id);
        setTodonameEdit(e.todoname)
        setSelectedTodoId(e.id)

    }

    const handleCancelButton = (e) => {
            setSelectedTodoId(" ")
    }

    const handleSaveButton = (e) => {
        setTodoname(" ");
        const {id,name} = e.target
        axios.post('/TodoUpdate',{id: id, todoname: name })
        .then(function (response) 
        {
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
            let event = await axios.post('/insert', detail)
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

    function getTodoName(id) {
        axios.get(`/getTodo/${id}`)
            .then(function (response) {
                setTodoname(response.todoname);
            })
            .catch(function (error) { return error })
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div class="content">
            <div class="todowrapper">
            <head>
                <title>TODO LIST</title>
            </head>
            <body id="container">
            {/* {localStorage.getItem("username")}'s */}
           
            <button id="btnLogout" onClick={props.handleLogoutButton}>Logout</button>
            <br></br>
            <br></br>
            <input type="text" id="todo" onChange={todonameInputChange} value={todoname}/>
            <button className="btn btn-primary" onClick={handleAddButton} style={{ backgroundColor: 'skyblue' }}>Add</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
            <h1 id="todoheader">TODO LIST</h1>
                <table border='1' align="center">
   
                    <tbody>
                        <tr>
                            {/* <th>Id</th> */}
                            <th id="todoList">Todo List</th>
                            <th>Actions</th>
                        </tr>
                        {
                            data.length &&
                                data.map((items) => {
                                    return (
                                        <tr>
                                            <td id={items.id} onClick={ () => handlerSelectedTodo(items)}> {selectedTodoId === items.id ? 
                                            <input
                                                variant="outlined"
                                                label="Edit text"
                                                type="text" id={items.id} value={todonameEdit} onChange={todonameEditInputChange}></input>
                                            : items.todoname  
                                            }</td>
                                        <td>
                                        {selectedTodoId === items.id ? 
                                           <div>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    className="button"
                                                    startIcon={<SaveIcon/>}
                                                    id={selectedTodoId} name= {todonameEdit} onClick={handleSaveButton}>SAVE</Button>
                                                <Button 
                                                    className="button"
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    startIcon={<CancelIcon/>}
                                                    
                                                    onClick={handleCancelButton}>CANCEL</Button>
                                           </div>
                                            :   <Button 
                                                    variant="contained"
                                                    color="secondary"
                                                    className="button"
                                                    startIcon={<DeleteIcon/>}
                                                    type="button" id={items.id} onClick={() => handleDeleteButton} className="btn btn-outline-danger">DELETE</Button> 
                                        }</td>
                                        </tr>
                                            )
                                        }) 
                        }
                    </tbody>
                </table>      
            </div>
            </body>
            </div>
            {/* <button id="btnLogout" onClick={props.handleLogoutButton}>Logout</button>
            <br></br>
            <br></br>
            <input type="text" id="todo" onChange={todonameInputChange} value={todoname}/>
            <button onClick={handleAddButton} style={{ backgroundColor: 'skyblue' }}>Add</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br> */}
            {/* <div>
                <table border='1' align="center">
                    <tbody>
                        <tr>
                            {/* <th>Id</th> */}
                            {/* <th>Todo List</th>
                            <th>Actions</th>
                        </tr>
                        {
                            data.length &&
                                data.map((items) => {
                                    return (
                                        <tr>
                                            <td id={items.id} onClick={ () => handlerSelectedTodo(items)}> {selectedTodoId === items.id ? 
                                            <input type="text" id={items.id} value={todonameEdit} onChange={todonameEditInputChange}></input>
                                            : items.todoname  
                                            }</td>
                                        <td>
                                        {selectedTodoId === items.id ? 
                                           <div>
                                                <button id={selectedTodoId} name= {todonameEdit} onClick={handleSaveButton}>SAVE</button>
                                                <button  onClick={handleCancelButton}>CANCEL</button>
                                           </div>
                                            :   <button id={items.id} onClick={handleDeleteButton} >DELETE</button> 
                                        }</td>
                                        </tr>
                                            )
                                        })  */}
            {/* //             }
            //         </tbody> */}
            {/* //     </table>          */}
            {/* // </div> */}
        </div>
    )
}

export default Todo