import React ,{useState} from 'react'
import axios from 'axios'
import validator from 'validator'


function Register(props) {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");


    const emailInputChange = (e)=>{
      setEmail(e.target.value);
    }

    const usernameInputChange = (e)=>{
      setUsername(e.target.value);
    }

    const passwordInputChange = (e)=>{
      setPassword(e.target.value);
    }

    const confirmPasswordInputChange = (e)=>{
        setConfirmPassword(e.target.value);
      }


    const handleSubmit = async () =>{
        const detail = {
            email,
            username,
            password
        }

      
         if(email!==""&&username!==""&&password!=="")
         {
          if(password===confirmPassword)
          {
            if(validator.isEmail(email))
            {
             let event = await axios.post('/register',detail)
             console.log("event",event.data);
              if(event.data.Type==="Success")
              {
                localStorage.setItem("component", "todo")
                localStorage.setItem("username",username)
                localStorage.setItem("userId",event.data.Payload.generated_keys[0]);

                console.log("payload",event.data.Payload)
                props.setUser(username);
                props.setUserId(event.data.Payload.generated_keys[0])   
                props.showTodo()
              }
              else
              {
                 setError("Credentials already exist!")
              }
            }
            else
            {
              setError("Not valid email!")
            }
          }
          else
          {
            setError("Password doesn't match!!")
          }
        }
        else
        {
           setError("Fields are required!")
        }
    }

    return (
      <div class="content">
      <h2>Sign up</h2>
      <div onsubmit="event.preventDefault()">
      <div class="field-wrapper">
          <input type="text" name="email" value = {email} onChange={emailInputChange} placeholder="email" autoComplete="off"/>
          <label>Email</label>
        </div>
        <div class="field-wrapper">
          <input type="text" name="username" value = {username} onChange={usernameInputChange} placeholder="username" autoComplete="off"/>
          <label>Username</label>
        </div>
        <div class="field-wrapper">
          <input type="password" name="password" value = {password} onChange={passwordInputChange} placeholder="password"/>
          <label>Password</label>
        </div>
        <div class="field-wrapper">
          <input type="password" name="password2" value={confirmPassword} onChange= {confirmPasswordInputChange} placeholder="password" />
          <label>Re-enter password</label>
          <span style={{color:"red", fontSize: "0.75em", textAlign:"center"}} >{error}</span>
        </div>
        <div class="field-wrapper">
          <input type="submit" onClick={handleSubmit}/>
        </div>
        <span class="singin" onClick={props.showLogin}>Already a user?  Sign in</span>
      </div>
    </div>
    )
}

export default Register

