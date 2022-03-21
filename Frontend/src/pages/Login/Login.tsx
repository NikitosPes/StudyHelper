import axios from "axios";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useInput } from "../../hooks/useInput";

export const Login = () => {

    let navigate = useNavigate(); 

    const email = useInput('', {require: true, type: 'email'});
    const password = useInput('', {require: true, type: 'password'});

    const Clik = () => {
        axios.post('http://localhost:8080/api/sign-in',{
            email: email.value,
            password: password.value
        })
        .then((response) => {
            console.log('access_token', response.data.token);
            
            localStorage.setItem('access_token', response.data.token);
            navigate('/');
        });
    }

    const displayError = (error: string | undefined | null) => {
        if(error){
            return <div>{error}</div>
        }
        return null;
    }

    return(
        <div>
            <label>Login </label>
            {displayError(email.error)}
            <input type="text" onChange={email?.onChange}/><br />
            
            <label>Password </label>
            {displayError(password.error)}
            <input type="password" onChange={password?.onChange}/><br />
            <button onClick={Clik}>Login</button>
        </div>
    );
}