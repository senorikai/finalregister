import React ,{useState} from 'react'
import axios from 'axios'


function Register(props) {
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const usernameInputChange = (e)=>{
      setUsername(e.target.value);
    }

    const passwordInputChange = (e)=>{
      setPassword(e.target.value);
    }

    const confirmPasswordInputChange = (e)=>{
        setConfirmPassword(e.target.value);
      }

    const handleSubmit = () =>{
        const detail = {
            username,
            password
        }
         if(username!==""&&password!==""&&password===confirmPassword){
          setPassword("");
          setUsername("");
          setConfirmPassword("");
             axios.post('/register',detail)
                  .then((e)=>{
                      console.log(e.data.Type)
                      if(e.data.Type==="Success"){
                        localStorage.setItem("component", "showThankYou")
                        localStorage.setItem("username",username)
                         props.showThankYou()
                         props.setUser(username);
                      }
                      else
                      {
                        console.log("Error",e.data.Message)
                         alert("There are errors in your brain")
                      }
                    })
                  .catch(err=>{
                    console.log("Error",err)
                  })
         }else{
           setError(true)
         }
    }

    return (
      <div class="content">
      <h2>Sign up</h2>
      <div onsubmit="event.preventDefault()">
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
          <span style={{color:"red", fontSize: "0.75em", textAlign:"center"}} >{error?"*Fields are required":""}</span>
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

