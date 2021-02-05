import React, { useState } from 'react'
import axios from 'axios'

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorNotFound, seterrorNotFound] = useState("false");

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
                    if (e.data.Type === "Success") {
                    localStorage.setItem("component", "showThankYou")
                    localStorage.setItem("username",username)
                    props.showThankYou()
                    props.setUser(username);
                    }
                    else {
                        seterrorNotFound(true)
                    }
                })
                .catch(err => {
                })
        }
        else {
            setError(true)
        }
    }
    return (
        <div class="content">
        <h2>Sign in</h2>
        <div onsubmit="event.preventDefault()">
          <div class="field-wrapper">
            <input type="text" name="username" value = {username} placeholder="username" onChange = {usernameInputChange}/>
            <label>Username</label>
          </div>
          <div class="field-wrapper">
            <input type="password" name="password" value = {password} placeholder="password" autocomplete="new-password" onChange={passwordInputChange}/>
            <label>Password</label>
            <span style={{color:"red", fontSize: "0.75em", textAlign:"center"}} >{error?"*Fields are required":""}</span>
          </div>
          <div class="field-wrapper">
            <input type="submit"  onClick={handleSubmit}/>
          </div>
          <span class="signup" onClick={props.showSignup}>Not a user?  Sign up</span>
        </div>
      </div>
    )
}
export default Login