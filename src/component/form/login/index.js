import React, { useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@material-ui/core';
import PasswordField from 'material-ui-password-field'

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameInputChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordInputChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        const detail = {
            username,
            password
        }
        if (username !== "" && password !== "") {
            setPassword("");
            setUsername("");
            axios.post('/login', detail)
                .then((e) => {
                    // console.log(e.data.Type, e.data.Message)
                    if (e.data.Type === "Success") {
                    alert("Login Successfully");
                    props.changeUser(username);
                    }
                    else {
                        // console.log("Error",e.data.Message)
                        alert("Credentials not found!")
                    }
                })
                .catch(err => {
                })
        }
        else {
            alert("Fields are required!")
        }
    }
    return (
        <div> 
        <h1>dna:micro</h1>
      <img src='/login.jpg' width="500" height="200"/>
      <h1>LOGIN</h1>
      <TextField value= {username} id="user" className="textfield" placeholder="Type Username" color="secondary" label="Username" onChange={usernameInputChange} />
      <PasswordField value= {password} id="password" placeholder="Type Password" color="secondary" variant="outlined" label="Password" onChange={passwordInputChange}/>
      <Button onClick={handleSubmit}  variant="outlined" color="secondary">LOGIN</Button>
      </div>
    )
}
export default Login