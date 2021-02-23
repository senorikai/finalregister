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
      {prismClass === 'todo' ? <Todo userId={userId} handleLogoutButton={handleLogoutButton}></Todo> :
        <>
          <ul className="nav">
          </ul>
          <div className="wrapper">
            <div className={`rec-prism ${prismClass}`}>
              <div className="face face-top">
                <div className="content">
                  <div className="field-wrapper">
                    <input type="text" name="email" placeholder="email" />
                    <label>e-mail</label>
                  </div>
                  <div className="field-wrapper">
                    <input onClick={showTodo} />
                  </div>
                </div>
              </div>
              <div className="face face-front">
                <Login
                  showTodo={showTodo}
                  showSignup={showSignup}
                  setUser={setUser}
                  setUserId={setUserId}
                ></Login>
              </div>
              <div className="face face-right">
                <Register
                  showTodo={showTodo}
                  showLogin={showLogin}
                  setUser={setUser}
                  setUserId={setUserId}
                ></Register>
              </div>
              <div className="face face-bottom">
                <div className="content">
                  <div className="thank-you-msg">
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
