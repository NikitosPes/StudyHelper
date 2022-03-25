import React, { useState, useEffect } from 'react'
import styles from './Group.module.css'
import API from '../../helpers/api';

import { StudentForm } from '../../forms/StudentForm/StudentForm';
import { StudentsList } from './StudentsList/StudentsList';
import { Modal } from '../../components/Modal/Modal';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { StudentListHeader } from './StudentListHeader/StudentListHeader';

import { StudentRequestModel, StudentResponseModel } from '../../models/StudentModles';

export const Group: React.FC = () => {

    const [data, setData] = useState<StudentResponseModel []>([]);
    const [currentStudent, setCurrentStudent] = useState<StudentResponseModel | null>(null);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [searchingQuery, setQuery] = useState<string>('');
    
    useEffect(() => {
        API.get('/group')
            .then(response => setData(response.data));
    }, []);

    useEffect(() => {findStudentBySurname()}, [searchingQuery]);

    const EditStudentRequest = (id: number, student: StudentRequestModel) => {
        API.put(`/group/${id}`, {student})   
    }

    const AddNewStudentRequest = (student: StudentRequestModel) => {
        API.post('/group', {student})
    }

    const DeleteButtonHandler = (id: number) => {
        API.delete(`/group/${id}`)
            .then(() => {
                setData(previousState => previousState.filter(item => item.Id !== id));
            });
    } 

    const EditButtonHandler = (student: StudentResponseModel) => {
        setCurrentStudent(student);
        setModalActive(true);
    } 

    const AddStudentHandler = () => {
        setCurrentStudent(null);
        setModalActive(true);
    }

    const sortByName = () => {
        const tempState = [...data];
        tempState.sort((a, b) => {
            if(a.Name > b.Name) return 1;
            if(a.Name < b.Name) return -1;
            return 0;
        })
        setData(tempState);
    }

    const sortBySurname = () => {
        const tempState = [...data];
        tempState.sort((a, b) => {
            if(a.Surname > b.Surname) return 1;
            if(a.Surname < b.Surname) return -1;
            return 0;
        })
        setData(tempState);
    } 

    const findStudentBySurname = (): StudentResponseModel [] => {
        return data.filter(student =>{
            if(searchingQuery === '') 
                return student;
            if(student.Surname.toLocaleLowerCase().includes(searchingQuery.toLocaleLowerCase()))
                return student
        })
    }

    return (
        <div className={styles.container}>
            <SearchInput setValue={setQuery} text='Input student surname...'/>
            <StudentListHeader sortByNameHandler={sortByName} sortBySurnameHandler={sortBySurname}/>
            <StudentsList students={findStudentBySurname()} 
                editClickHandler={EditButtonHandler} 
                deleteClickHandler={DeleteButtonHandler}/>
                
            <Modal active = {modalActive} setActive = {setModalActive} 
                children = {<StudentForm formIsActive={modalActive} updatingStudent={currentStudent} APICreateRequest={AddNewStudentRequest} APIEditRequest={EditStudentRequest} />}/>

            <button className={styles.addStudentButton} onClick={AddStudentHandler}>Add new Student</button>
        </div>
    )
}