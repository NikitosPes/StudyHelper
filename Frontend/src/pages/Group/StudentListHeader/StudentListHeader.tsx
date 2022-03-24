import React from 'react';
import styles from './StudentListHeader.module.css'

const triangleIcon = require('../../../assets/images/triangle-icon.png')

interface StudentListHeaderProps {
    sortBySurnameHandler: () => void, 
    sortByNameHandler: () => void
}

export const StudentListHeader: React.FC<StudentListHeaderProps> = ({ sortBySurnameHandler, sortByNameHandler }) => {

    const SORTED_STYLE = styles.sorted;
    const UNSORTED_STYLE = styles.unsorted;

    const[nameButtonClass, setNameButtonClass] = React.useState<string>(UNSORTED_STYLE);
    const[surnameButtonClass, setSurnameButtonClass] = React.useState<string>(SORTED_STYLE);


    const changeClassName = () => {
        if(nameButtonClass === UNSORTED_STYLE) {
            setNameButtonClass(SORTED_STYLE);
            setSurnameButtonClass(UNSORTED_STYLE);
            return;
        } 
        setNameButtonClass(UNSORTED_STYLE);
        setSurnameButtonClass(SORTED_STYLE);
    }

    const sortByName = () => {
        sortByNameHandler();
        changeClassName();
    }
    
    const sortBySurname = () => {
        sortBySurnameHandler();
        changeClassName();
    }

    return(
        <div className={styles.columnsName}>
                <p>№</p>
                <button onClick={sortBySurname} className={styles.sortButton}>
                    <p>Surname</p>
                    <img src={triangleIcon} className={surnameButtonClass}/>
                </button>
                <button onClick={sortByName} className={styles.sortButton}>
                    <p>Name</p>
                    <img src={triangleIcon} className={nameButtonClass}/>
                </button>
                <p>Email</p>
                <p>Phone</p>
            </div>
    )
} 