import React, { useEffect, useState } from "react";
import { useInput, errorstyles} from "../hooks/useInput";

import { SubmitButton } from "../components/SubmitButton/SubmitButton";

import { StudentRequestModel } from '../interfaces/models'
import { IStudentModel } from '../interfaces/models'

interface StudentFormProps {
    student: IStudentModel; 
    createRequest: (student:StudentRequestModel) => void,
    editRequest: (student: StudentRequestModel, id: number) => void,
}

export const StudentForm: React.FC<StudentFormProps> = ({ student, createRequest, editRequest }) => {

    const PATH = '/group';

    const [validFrom, setValidForm] = useState(false);
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const name = useInput(student.Name, {require: true, type: 'text', minLength: 4});
    const surname = useInput(student.Surname, {require: true, type: 'text', minLength: 4});
    const email = useInput(student.Email, {require: true, type: 'email'});
    const phone = useInput(student.Phone, {require: true, type: 'text', minLength: 9});

    const checkMode = () => {
        if(student.Name && student.Surname !== '')
            return setEditMode(true);
        setEditMode(false);
    }

    useEffect(() => {
        refreshFrom(student);
        disableSubmitButton();
        checkMode();
    }, [student])

    useEffect(() => {
        disableSubmitButton();
    }, [name.isValid, surname.isValid, email.isValid, phone.isValid])

    const refreshFrom = (student: IStudentModel) => {
        name.setValue(student.Name);
        surname.setValue(student.Surname); 
        email.setValue(student.Email); 
        phone.setValue(student.Phone); 
    }
    
    const displayError = (error: string | undefined | null) => {
        if(error) return <div style={errorstyles}>{error}</div>
        return null;
    }

    const disableSubmitButton = () => {
        if(name.isValid && surname.isValid && email.isValid && phone.isValid) 
            return setValidForm(true);
        return  setValidForm(false);
    }

    const submitRequest = (handlerStudent: StudentRequestModel) => {
        if(isEditMode) {
            editRequest(handlerStudent, student.Id);
            return;
        }
        createRequest(handlerStudent);
    }

    const onClickHandler = () => {
        const student: StudentRequestModel = new StudentRequestModel(name.value, surname.value, email.value, phone.value);
        submitRequest(student);
    }
    
    return (
        <>
            <h1>Create Student</h1>
            <form>
                {displayError(name.error)}
                <label >Name: </label>
                <input type="text" onChange={name.onChange} onBlur={name.onBlur} value={name.value}/><br />

                {displayError(surname.error)}
                <label >Surname: </label>
                <input type="text" onChange={surname.onChange} onBlur={surname.onBlur} value={surname.value}/><br />

                {displayError(email.error)}
                <label >Email: </label>
                <input type="text" onChange={email.onChange} onBlur={email.onBlur} value={email.value}/><br />
                
                {displayError(phone.error)}
                <label >Phone: </label>
                <input type="text" onChange={phone.onChange} onBlur={phone.onBlur} value={phone.value}/><br />

                <input type="submit" disabled = {!validFrom} />
                {/* <SubmitButton text="Submit" onClick={onClickHandler} disabled={disableSubmitButton()}/> */}
            </form>
        </>
    )
}