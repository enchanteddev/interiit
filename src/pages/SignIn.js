import React, {useState,useEffect} from 'react'

import style from '../styles/Signin.module.css'




function LoginUser(body) {
    /* return fetch(`http://127.0.0.1:8000/auth/`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    }).then(resp => resp.json()) */
    return new Promise((resolve, reject) => {
        resolve({
            token: "1234567890"
        })
    });
}


function RegisterUser(body) {
    /* return fetch(`http://127.0.0.1:8000/api/users/`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(body)
    }).then(resp => resp.json()) */
    return {
        token: "1234567890"
    }
}



export default function Signin({setUser}){
    const [username, setUsername] = useState('kaushik')
    const [password, setPassword] = useState('')
    const [isMentor, setIsMentor] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [isLogin, setLogin] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('mytoken'));
    //const [token, setToken, removeToken] = useCookies(['mytoken'])
    
    function GetUserData(token) {
        
        return {
            id: 1,
            name: username,
            isMentor: isMentor,
            topics: []
        }
    }

    useEffect(()=> {
        var user_token = token
        console.log('Login User token is',user_token)
        
        if(String(user_token) === 'null'){
        }else{
            setUser(GetUserData(token))
        }

    }, [token])

    const login = () => {
        if(username.trim().length !==0 && password.trim().length){
            console.log('Username And Password Are Set')
            LoginUser({username,password})
            .then(resp => {
                localStorage.setItem('mytoken', resp.token);
                setToken(resp.token)
                console.log('logged', resp.token)
            })
            .catch(error => console.log(error))
        }else{
            console.log('Username And Password Are Not Set')
        }
    }


    const register = () => {
        if(username.trim().length !== 0 && password.trim().length !== 0){
            console.log('Username and password are set');
            RegisterUser({username, password})
            .then(() => login())
            .catch(error => console(error))
        }else{
            console.log('Username and password are not set');

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isRegistering) {
            register()
        }
        else {
            login()
        }
    }

    return (
        <div className={style.main}>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.heading}>{isRegistering ? "Register as a" : "Sign in as a"}
                <select name="usertype" onChange={(e) => {setIsMentor(e.target.value === "Mentor")}}>
                    <option value="Mentee">Mentee</option>
                    <option value="Mentor">Mentor</option>
                </select></div>
                <hr />
                <input className={style.input} type="text" placeholder='Username' onChange={(e) => {setUsername(e.target.value)}}/>
                <input className={style.input} type="password" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
                <div className={style.sioptions}>
                    <button type='submit'>{isRegistering ? "Register" : "Sign In"}</button>
                    <button className={style.linkbutton} onClick={() => {setIsRegistering(!isRegistering)}}>{isRegistering ? "Sign In to your Account" : "Create an account"}</button>
                </div>
            </form>
        </div>
    )

}