import React, {useState} from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './styles.css'
import {Actions} from "../../reducer/actions";
import {useDispatch} from "react-redux";

const Login = () => {

    const dispatch = useDispatch();

    const setDisplayedScreen = (payload) => dispatch({ type: Actions.SetDisplayedScreen, payload });

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='login-screen'>
            <div className='login-card'>
                <div className='header'>
                    <h4>Enter your credentials</h4>
                </div>
                <div className='fields'>
                    <span className="p-float-label">
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </span>
                    <span className="p-float-label">
                        <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="username">Password</label>
                    </span>
                    <Button label="Login" onClick={() => setDisplayedScreen('home')} />
                </div>
            </div>
        </div>
    )
}

export default Login
