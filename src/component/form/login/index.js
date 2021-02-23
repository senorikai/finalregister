import React, { useState } from 'react'
import axios from 'axios'

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const emailInputChange = (e) => {
    setEmail(e.target.value);
  }

  const usernameInputChange = (e) => {
    setUsername(e.target.value);
  }

  const passwordInputChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      const detail = {
        email,
        username,
        password
      }
      if (email !== "" && username !== "" && password !== "") {
        setEmail("");
        setPassword("");
        setUsername("");
        const event = await axios.post('/login', detail)
        if (event.data.Type === "Success") {
          localStorage.setItem("component", "todo")
          localStorage.setItem("username", username)
          localStorage.setItem("userId", event.data.Payload);

          console.log(event.data.Payload)

          props.setUser(username);
          props.setUserId(event.data.Payload)

          props.showTodo();
        }
        else {
          setError('You entered wrong Username or Password')
        }
      }
      else {
        setError("Fields are required")
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="content">
      <h2>Login</h2>
      <div className="field-wrapper">
        <input type="text" name="email" value={email} onChange={emailInputChange} placeholder="email" />
        <label>Email</label>
      </div>
      <div className="field-wrapper">
        <input type="text" name="username" value={username} placeholder="username" onChange={usernameInputChange} />
        <label>Username</label>
      </div>
      <div className="field-wrapper">
        <input type="password" name="password" value={password} placeholder="password" autoComplete="new-password" onChange={passwordInputChange} />
        <label>Password</label>
        <span style={{ color: "red", fontSize: "0.75em", textAlign: "center" }} >{error}</span>
      </div>
      <div className="field-wrapper">
        <input type="submit" onClick={handleSubmit} />
      </div>
      <span className="signup" onClick={props.showSignup}>Not a user?  Sign up</span>
    </div>
  )
}
export default Login