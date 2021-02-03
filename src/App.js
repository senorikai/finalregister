import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@material-ui/core';
import Login from './component/form/login'
import Register from './component/form/register'
import {useState} from 'react'
// import Form from './component/form'
import Dashboard from './component/dashboard'

function App() {

  const [route, setRoute] = useState("form")
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <Login></Login>
      <Register></Register>
      </div>
  );
}

export default App;
