import React, { useContext, useState } from 'react'
import { LoginContext } from '../context/LoginContext';

const Signup = () => {
    const name = useInput('');
    const email = useInput('');
    const password = useInput('');
    const { signUpData, msg } = useContext(LoginContext);
    return (
        <div className="container mt-5 p-5">
            <form>
                <div className="form-group">
                    <label htmlFor="nameInput">Name</label>
                    <input type="text" {...name} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="emailInput">Email</label>
                    <input type="text" id="email" {...email} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" {...password} className="form-control" />
                </div>
                <div className="form-group">
                    <input type="button" id="submit"
                        onClick={() => signUpData(name.value, email.value, password.value)}
                        className="form-control btn btn-success" value='Sign Up' />
                </div>
                <div className="text-center text-danger">
                    {msg ? <p>{msg}</p> : null}
                </div>
            </form>
        </div>
    );
}

export const useInput = initial => {
    const [value, setValue] = useState(initial);
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange,
    }
}

export default Signup