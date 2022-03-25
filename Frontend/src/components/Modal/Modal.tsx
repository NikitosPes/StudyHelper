import React, { ReactNode } from 'react';
import styles from './Modal.module.css'

interface IProps {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode
}

export const Modal: React.FC<IProps> = ({active, setActive, children}) => {
    return (
        <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick = {()=>{setActive(false)}}>
            <div className={styles.content} onClick = {e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}