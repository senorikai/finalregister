import './App.css';
import Login from './component/form/login'
import Register from './component/form/register'
import {useState} from 'react'


function App() {

  const [user, setUser] = useState(null)

  const [prismClass,setprismClass] = useState(localStorage.getItem("component")?localStorage.getItem("component"):"showLogin")


  function showSignup(){
    localStorage.setItem("component","showSignup")
    setprismClass("showSignup")
  }
  function showLogin(){
    localStorage.setItem("component","showLogin")
    setprismClass("showLogin")
  }
  
  function showThankYou(){
    localStorage.setItem("component","showThankYou")
    setprismClass("showThankYou")
  }

  const handleLogoutButton = () => {
    localStorage.setItem("component","showLogin")
    setprismClass("showLogin")
  }

  return (
    <div className="App">
<ul class="nav">
  <li onClick={showLogin}>Login</li>
  <li onClick={showSignup}>Sign up</li>
</ul>
<div class="wrapper">
  <div class={`rec-prism ${prismClass}`}>
    <div class="face face-top">
      <div class="content">
        <h2>Subscribe</h2>
        <small>Enter your email so we can send you the latest updates!</small>
        <div onsubmit="event.preventDefault()">
          <div class="field-wrapper">
            <input type="text" name="email" placeholder="email"/>
            <label>e-mail</label>
          </div>
          <div class="field-wrapper">
            <input onClick={showThankYou}/>
          </div>
        </div>
      </div>
    </div>
    <div class="face face-front">
    <Login
      showThankYou = {showThankYou}
      showSignup = {showSignup}
      setUser = {setUser}
      ></Login>
    </div> 
     <div class="face face-right">
     <Register 
      showThankYou = {showThankYou}
      showLogin = {showLogin}
      setUser = {setUser}>
      
     
      </Register>
    </div> 
    <div class="face face-bottom">
      <div class="content">
        <div class="thank-you-msg">
          Hi {localStorage.getItem("username")}!
          <br/>
          <br/>
          <br/>
          <br/>
          <button class= "logoutButton" onClick= {handleLogoutButton}>LOGOUT</button>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default App;
