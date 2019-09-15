import React, { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../context/LoginContext'

const LoginHooks = (props) => {
    const token = sessionStorage.getItem('isTokenValid');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const { loginData, msg } = useContext(LoginContext);
    useEffect(() => {
        token ? props.history.push('/lists') : props.history.push('/loginHook')
    }, [token]);
    const onLogin = (e) => {
        // e.preventDefault();
        loginData(email, password);
    }
    return (
        <div className="container mt-5 p-5">
            <form>
                <div className="form-group">
                    <label htmlFor="emailInput">Email</label>
                    <input type="text" onChange={(e) => setemail(e.target.value)} name='email' className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" onChange={(e) => setpassword(e.target.value)} name='password' value={password} className="form-control" />
                </div>
                <div className="form-group">
                    <input type="button" onClick={() => onLogin()} className="form-control btn btn-success" value='Log In' />
                </div>
                <div className="text-center text-danger">
                    {msg ? <p>{msg}</p> : null}
                </div>
            </form>
        </div>
    );
}

export default LoginHooks;