import React ,{useState} from 'react'
import axios from 'axios'
import { Button, TextField, ButtonGroup } from '@material-ui/core';
import PasswordField from 'material-ui-password-field'


function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const usernameInputChange = (e)=>{
      setUsername(e.target.value);
      console.log(e.target.value);
    }

    const passwordInputChange = (e)=>{
      setPassword(e.target.value);
      console.log(e.target.value);
    }

    const confirmPasswordInputChange = (e)=>{
        setConfirmPassword(e.target.value);
        console.log(e.target.value);
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
                        alert("Register Successfully!")
                         props.changeRoute("dashboard")
                         props.changeUser(username);
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
            // props.createNotification('error',"")
            // console.log("error")
            alert("Some conditions are not performed correctly!")
         }
    }

    return (
        <div>

<h1>REGISTER</h1>
      <TextField value= {username} id="user" className="textfield" placeholder="Type Username" color="secondary" label="Username" onChange={usernameInputChange}/>
      <PasswordField value= {password} id="password" placeholder="Type Password" color="secondary" onChange={passwordInputChange}/>
      <PasswordField value= {confirmPassword} id="password" placeholder="Confirm Password" color="secondary" label="Password" onChange={confirmPasswordInputChange}/>
      <Button variant="outlined" color="secondary" onClick={handleSubmit} >REGISTER</Button>
    </div>
    )
}

export default Register
