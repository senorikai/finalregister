import './App.css';
import Login from './component/form/login'
import Register from './component/form/register'
import { useState } from 'react'
import Todo from './component/todo'

function App() {

  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null)

  const [prismClass, setprismClass] = useState(localStorage.getItem("component") ? localStorage.getItem("component") : "showLogin")


  function showSignup() {
    localStorage.setItem("component", "showSignup")
    setprismClass("showSignup")
  }
  function showLogin() {
    localStorage.setItem("component", "showLogin")
    setprismClass("showLogin")
  }

  function showThankYou() {
    localStorage.setItem("component", "showThankYou")
    setprismClass("showThankYou")
  }

  const handleLogoutButton = () => {
    localStorage.setItem("component", "showLogin")
    setprismClass("showLogin")
  }

  return (
    <div className="App">
      {prismClass === 'dashboard'? <Todo></Todo> : 
      <>
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
                  <input type="text" name="email" placeholder="email" />
                  <label>e-mail</label>
                </div>
                <div class="field-wrapper">
                  <input onClick={showThankYou} />
                </div>
              </div>
            </div>
          </div>
          <div class="face face-front">
            <Login
              showThankYou={showThankYou}
              showSignup={showSignup}
              setUser={setUser}
              setUserId={setUserId}
            ></Login>
          </div>
          <div class="face face-right">
            <Register
              showThankYou={showThankYou}
              showLogin={showLogin}
              setUser={setUser}>


            </Register>
          </div>
          <div class="face face-bottom">
            <div class="content"> 
               <div class="thank-you-msg">
                {/* {userId} {localStorage.getItem("username")}! */}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <button class="logoutButton" onClick={handleLogoutButton}>LOGOUT</button> 
              </div> 
             </div>
             
            
          </div>
                    {/* <button class="logoutButton" onClick={handleLogoutButton}>LOGOUT</button> */}
          
        </div>
        
      </div>
      </>
      }


      {/* <Todo></Todo> */}

      
    </div>
  );
}

export default App;
