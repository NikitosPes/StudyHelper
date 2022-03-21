import React from 'react'
import styles from './StudentsListItem.module.css'
import { IStudentModel }  from '../../../interfaces/models'
import { Modal } from '../../../components/Modal/Modal';

const editIcon = require('../../../assets/images/edit-button.png');
const deleteIcon = require('../../../assets/images/delete-button.png')

interface StudentListItemProps {
    index: number,
    student: IStudentModel,
    deleteHandler: (id: number) => void,
    editHandler: (student: IStudentModel) => void,
}

export const StudentsListItem: React.FC<StudentListItemProps> = ({index, student, deleteHandler, editHandler}) => {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <p>{index}</p>
                <p>{student.Surname}</p>
                <p>{student.Name}</p>
                <p>{student.Email}</p>
                <p>{student.Phone}</p>
            
                <button onClick={() => editHandler(student) }>
                    <img src={editIcon} className={styles.icon}/>
                </button>

                <button onClick={() => deleteHandler(student.Id)}>
                    <img src={deleteIcon} className={styles.icon}/>
                </button>
            </div>
        </div>
    );
}