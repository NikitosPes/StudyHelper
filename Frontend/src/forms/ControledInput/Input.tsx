import React from 'react'
import { errorstyles } from '../../hooks/useInput'

interface IInputProps {
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: () => void,
    value: string,
    error: string,
    type?: 'text' | 'password'
}

export const Input: React.FC<IInputProps> = ({ label, onChange, onBlur, value, error, type }) => {

    const displayError = (error: string) => {
        if(error) 
            return <div style={errorstyles}>{error}</div>
        return null;
    }

    return(
        <>
            {displayError(error)}
            <label>{label}</label>
            <input type={type ? type : 'text'} onChange={onChange} onBlur={onBlur} value={value}/>
            <br/>
        </>
    )
}