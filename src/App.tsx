import React from 'react';
import logo from './logo.svg';
import './App.css';
import {auth} from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function App() {
  const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
    setEmail("")
    setPassword("")
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input placeholder="Email..." onChange={e => setEmail(e.target.value)}/>
<input placeholder="Passwon..." type="password" onChange={e => setPassword(e.target.value)}/>
<button onClick={handleLogin}>login</button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div>

</div>
    </div>
  );
}

export default App;
