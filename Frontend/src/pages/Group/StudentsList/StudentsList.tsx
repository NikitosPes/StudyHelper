import React from "react";
import styles from './StudentsList.module.css'

import { StudentsListItem } from '../StudentsListItem/StudentsListItem'

import { StudentResponseModel }  from '../../../models/StudentModles'


interface StudentListProps {
    students: StudentResponseModel[],
    editClickHandler: (student: StudentResponseModel) => void,
    deleteClickHandler: (id: number) => void,
}

export const StudentsList: React.FC<StudentListProps> = ({ students, editClickHandler, deleteClickHandler }) => {
    return(
        <div className={styles.studentListContainer}>
            {/* <StudentListHeader sortBySurnameHandler={sortBySurname} sortByNameHandler={sortByName}/> */}
                {students.map((item, index) => {
                    return <StudentsListItem
                            index={index + 1} 
                            student={item} 
                            deleteClickHandler={deleteClickHandler}  
                            editClickHandler={editClickHandler}
                            key={item.Id}/>
                 })}
        </div>
    )
}


