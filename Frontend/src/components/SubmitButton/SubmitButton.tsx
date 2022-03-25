import React from "react";
import styles from './SubmitButton.module.css'

interface IProps {
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    disabled: boolean
}

export const SubmitButton:React.FC<IProps> = ({text, onClick, disabled}) => {
    return(
        <button className={styles.button} onClick={onClick} disabled={disabled}>{text}</button>
    )
}