import './App.css';
import Login from './component/form/login'
import Register from './component/form/register'
import { useState } from 'react'
import Todo from './component/todo'

function App() {

  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(localStorage.getItem("userId") ? localStorage.getItem("userId") : null)

  const [prismClass, setprismClass] = useState(localStorage.getItem("component") ? localStorage.getItem("component") : "showLogin")


  function showSignup() {
    localStorage.setItem("component", "showSignup")
    setprismClass("showSignup")
  }
  
  function showLogin() {
    localStorage.setItem("component", "showLogin")
    setprismClass("showLogin")
  }

  function showTodo() {
    localStorage.setItem("component", "todo")
    setprismClass("todo")
  }

  const handleLogoutButton = () => {
    localStorage.setItem("component", "showLogin")
    localStorage.setItem("userId", "")
    localStorage.setItem("username", "")
  
    setprismClass("showLogin")
  }

  return (
    <div className="App">
      {prismClass === 'todo'? <Todo userId={userId} handleLogoutButton={handleLogoutButton}></Todo> : 
      <>
            <ul class="nav">
        <li onClick={showLogin}>Login</li>
        <li onClick={showSignup}>Sign up</li>
      </ul>
      <div class="wrapper">
        <div class={`rec-prism`}>
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
                  <input onClick={showTodo} />
                </div>
              </div>
            </div>
          </div>
          <div class="face face-front">
            <Login
              showTodo={showTodo}
              showSignup={showSignup}
              setUser={setUser}
              setUserId={setUserId}
            ></Login>
          </div>
          <div class="face face-right">
            <Register
              showTodo={showTodo}
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
              </div> 
             </div>
          </div>  
        </div>  
      </div>
      </>
      }
    </div>
  );
}

export default App;
