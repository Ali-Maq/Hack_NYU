import logo from './logo.svg';
import './App.css';
import { signInWithGoogle } from './firebase';

function App() {
  return (
    <div className="App">
      <button class="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
    </div>
  );
}


export default App;
