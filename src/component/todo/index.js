import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Todo(props) {

    const [todoname, setTodoname] = useState("") //qwerty
    const [idSave, setidSave] = useState("");
    const [data, setData] = useState([]);
    const [isEdit, setisEdit] = useState(false);
    const [todonameEdit,setTodonameEdit] = useState("")
    // const [selectedTodo, setSelectedTodo] = useState({});
    // const [selectedTodoId, setSelectedTodoId] = useState(" ");
 

    const todonameInputChange = (e) => {
        setTodoname(e.target.value);
        console.log(e.target.value)
    }

    const todonameEditInputChange = (e) => {
        setTodonameEdit(e.target.value);
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

    const handleUpdateButton = (e) =>
    {
        console.log(e.target.todoname)
        setisEdit(true);
        setTodonameEdit(e.target.name)
        setidSave(e.target.id)
        getTodoName(e.target.id)
    }

    // const handlerSelectedTodo = (e) =>
    // {
    //     // console.log(e.target.name)
    //     setTodonameEdit(e.target.name)
    //     setSelectedTodoId(e.target.id)
    //     getTodoName(e.target.id)

    // }

    // const handlerSelectedTodoId = (e) =>
    // {
    //     setSelectedTodoId(e.target.id)
    //     todonameEdit(e.target.name)
    // }

    // const handlerChangeEdit = (e) => 
    // {
    //     axios.post('/TodoUpdate', {id: selectedTodoId, todoname: todonameEdit})
    //     .then (function(response)
    //     {
    //         getUser()
    //     })
    //     .catch(function(error) {return error})
    // }

    const handleSaveButton = (e) => {
        setTodoname(" ");
        setisEdit(false);
        axios.post('/TodoUpdate',{id: idSave, todoname: todonameEdit })
        .then(function (response) 
        {
            getUser()
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
        // console.log('%c 🍷 userId: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', props.userId);
        axios.get(`/users/${props.userId}/todos`)
        
            .then(function (response) {
                // console.log('%c 🍬 response: ', 'font-size:20px;background-color: #465975;color:#fff;', response);
          
                setData(response.data);
            })
            .catch(function (error) { return error })
    }

    function getTodoName(id) {
        axios.get(`/getTodo/${id}`)
            .then(function (response) {
                setTodoname(response.todoname);
                console.log("pop", response.todoname)
            })
            .catch(function (error) { return error })
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div class="content">
            <button onClick={props.handleLogoutButton}>LOGOUT</button>
            <br></br>
            <br></br>
            <input type="text" id="todo" onChange={todonameInputChange} value={todoname}/>
            <button onClick={handleAddButton} style={{ backgroundColor: 'skyblue' }}>+</button>
            <br></br>
            <br></br>
           
            <br></br>
            <br></br>
            <div>
                <table border='1' align="center">
                    <tbody>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Todo List</th>
                            <th>Actions</th>
                        </tr>
                        {
                            data.length &&
                                data.map((items) => {
                                    return (
                                        <tr>
                                            {/* <td>{items.id}</td> */}
                                            <td >{items.todoname}</td>
                                            {/* <td id={items.id} name={items.todoname} onClick={handlerSelectedTodo}>{items.todoname}</td>
                                            {idSave === items.id ? (
                                                < input id="name" value={todonameEdit} onChange={handlerChangeEdit}/>
                                            ) : (
                                                todoname
                                            )} */}
                                            <td>
                                                <button id={items.id} onClick={handleDeleteButton} >DELETE</button>
                                                <button id={items.id} name={items.todoname} onClick={handleUpdateButton}>EDIT</button>
                                            </td>
                                        </tr>
                                   
                                    )
                                }) 
                        }
                    </tbody>
                </table>         
                <span>
                    <br></br>
                    <br></br>
                    {isEdit && <input value={todonameEdit} type="text" id="todoEdit" onChange={todonameEditInputChange}></input>}
                    {/* {console.log("asasa", todoname)} */}
                    <br></br>
                <br></br>
                     {isEdit && <button onClick={handleSaveButton}>Save</button>} 
                 </span>
                 <br></br>
                <br></br>
            </div>
        </div>
    )
}

export default Todo