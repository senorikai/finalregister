import React ,{useState} from 'react'
import axios from 'axios'


function Register(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const emailInputChange = (e)=>{
      setEmail(e.target.value);
    }

    const usernameInputChange = (e)=>{
      setUsername(e.target.value);
      // console.log(e.target.value);
    }

    const passwordInputChange = (e)=>{
      setPassword(e.target.value);
      // console.log(e.target.value);
    }

    const confirmPasswordInputChange = (e)=>{
        setConfirmPassword(e.target.value);
        // console.log(e.target.value);
      }

    const handleSubmit = () =>{
        const detail = {
            email,
            username,
            password
        }
         if(email!==""&&username!==""&&password!==""&&password===confirmPassword){
          setEmail("");
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
            alert("Some conditions are not performed correctly!")
         }
    }

    return (
      <div class="content">
      <h2>Sign up</h2>
      <div onsubmit="event.preventDefault()">
      <div class="field-wrapper">
          <input type="email" name="email" value = {email} onChange={emailInputChange}  autoComplete="off"/>
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

