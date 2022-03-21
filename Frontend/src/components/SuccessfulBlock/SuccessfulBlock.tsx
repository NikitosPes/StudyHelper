import React from 'react'
import styles from './SuccessfulBlock.module.css'

export const SuccessfulBlock: React.FC = (isSuccssesfull) => {
    
    const okMessage = 'The operation was successful';
    const errMessage = 'Failed to execute';

    return(
        <div className={styles.container}>
            <div>
                {isSuccssesfull ? okMessage : errMessage}
            </div>
        </div>
    );

} 