import React, { useState, useEffect } from "react";

type inputType = 'text' | 'email' | 'password';

interface useInputOptions {
    type: inputType,
    require: boolean,
    minLength?: number, 
}

export const useInput = (initial: string, {type, minLength, require}:useInputOptions) => {

    const [value, setValue] = useState<string>(initial);
    const [error, setError] = useState<string>('');
    const [isDirty, setDirty] = useState<boolean>(false);
    const [isValid, setValid] = useState<boolean>(false);

    useEffect(() => {
        checkValidation();
    }, [value, isDirty])


    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!isDirty)
            setDirty(true)
        setValue(e.target.value);     
    }

    const lengthValidation = () => {
        if(require) {
            if(value.length === 0){
                setValid(false);
                setError('Field cannot be empty');
                return;
            }
            setError('');
            setValid(true);
        }
        if(minLength === undefined) return;
        if(value.length < minLength) {
            setValid(false);
            setError(`Must be more than ${minLength} chapters`)
            return;
        }
        setError('');
        setValid(true);
    } 

    const emailValidation = () => {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(value)) {
            return setError('Invalid Email');
        }
        setError('');
        setValid(true);
    }

    const passwordValidation = () => {
        let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!regPassword.test(value)) {
            return setError('Invalid Password');
        }
        setError('');
        setValid(true);
    }

    const checkValidation = () => {
        if(!isDirty) return;
        switch(type){
            case 'email': 
                emailValidation();
                break;
            case 'password':
                passwordValidation();
                break;
            default:
                lengthValidation();
        }
    }

    return {
        value,
        setValue,
        error,
        isValid,
        setDirty,
        onChange: handlerChange,
        onBlur: () => setDirty(true)
    }
}

export const errorstyles = {
    color:'red',
    fontSize: '12px',
    marginTop: '5px'
}
