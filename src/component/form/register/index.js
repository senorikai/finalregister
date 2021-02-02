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
             axios.post('/register',detail)
                  .then((e)=>{
                      console.log(e.data.Type)
                      if(e.data.Type==="Success"){
                        //  props.createNotification('success',e.data.Message)
                         props.changeRoute("dashboard")
                         props.changeUser(username);
                      }else{
                        // props.createNotification('error',e.data.Message)
                        console.log("Error",e.data.Message)
                      }
                    })
                  .catch(err=>{
                    // props.createNotification('error',err)
                    console.log("Error",err)
                  })
         }else{
            props.createNotification('error',"Fields are required!")
         }
    }

    return (
        <div>

<h1>REGISTER</h1>
      <TextField id="user" placeholder="Type Username" color="secondary" label="Username" onChange={usernameInputChange}/>
      <PasswordField id="password" placeholder="Type Password" color="secondary" onChange={passwordInputChange}/>
      <PasswordField id="password" placeholder="Confirm Password" color="secondary" label="Password" onChange={confirmPasswordInputChange}/>
      <Button variant="outlined" color="secondary" onClick={handleSubmit} >REGISTER</Button>
    </div>
    )
}

export default Register
