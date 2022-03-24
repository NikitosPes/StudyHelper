import React from 'react'
import styles from './StudentsListItem.module.css'

import { StudentResponseModel } from '../../../models/StudentModles';

const editIcon = require('../../../assets/images/edit-button.png');
const deleteIcon = require('../../../assets/images/delete-button.png')

interface StudentListItemProps {
    index: number,
    student: StudentResponseModel,
    editClickHandler: (student: StudentResponseModel) => void,
    deleteClickHandler: (studentId: number) => void
}

export const StudentsListItem: React.FC<StudentListItemProps> = ({ index, student, editClickHandler, deleteClickHandler }) => {
    return (
        <div className={styles.listItemContainer}>
            
                <p>{index}</p>
                <p>{student.Surname}</p>
                <p>{student.Name}</p>
                <p>{student.Email}</p>
                <p>{student.Phone}</p>
            
                <button aria-label='editButton' onClick={() => editClickHandler(student)}>
                    <img src={editIcon} className={styles.buttonIcon}/>
                </button>

                <button aria-label='deleteButton' onClick={() => deleteClickHandler(student.Id)}>
                    <img src={deleteIcon} className={styles.buttonIcon}/>
                </button>
            
        </div>
    );
}