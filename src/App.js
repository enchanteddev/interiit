import { useState } from 'react';
import './App.css';
import Signin from './pages/SignIn';
import User from './pages/User';

function App() {
    const [user, setUser] = useState();
    console.log(user)
    return (
       <div className="App">
           {user ? <User user = {user}/> : <Signin setUser = {setUser}/>}
       </div>
    );
}

export default App;
