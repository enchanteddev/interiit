import { useState } from 'react';

import './App.css';
import Signin from './pages/SignIn';
import User from './pages/User';

function App() {
    const [user, setUser] = useState();
    //const [token, setToken, removeToken] = useCookies(['mytoken'])


    
    return (
       <div className="App">
           {user ? <User user = {(user)} setUser = {setUser}/> : <Signin setUser = {setUser}/>}
       </div>
    );
}

export default App;
