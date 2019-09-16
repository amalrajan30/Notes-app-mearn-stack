import React, { createContext, useState } from 'react'
import history from '../history';
import {API_BASE} from '../config'

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const [msg, setMsg] = useState('');
    const loginData = (email, password) => {
        fetch(`${API_BASE}/login`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    res.json().then(msg => setMsg(msg.msg))
                } else {
                    res.json().then(data => sessionStorage.setItem('token', data.token));
                    sessionStorage.setItem('isTokenValid', true)
                    history.push('/lists')
                }
            })
            .catch(err => console.log(err))
    }
    const signUpData = (name, email, password) => {
        fetch(`${API_BASE}/signup`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    res.json().then(msg => setMsg(msg.msg))
                } else {
                    res.json().then(data => sessionStorage.setItem('token', data.token));
                    sessionStorage.setItem('isTokenValid', true)
                    history.push('/lists');
                }
            })
            .catch(err => console.log(err))
    }
    const signOut = () => {
        sessionStorage.clear();
        history.push('/loginHook')
    }
    return (
        <LoginContext.Provider value={{ loginData, msg, signUpData, signOut }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;
