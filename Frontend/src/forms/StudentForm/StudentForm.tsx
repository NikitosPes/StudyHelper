import React, { useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";

import { Input } from "../ControledInput/Input";
import { StudentRequestModel, StudentResponseModel } from '../../models/StudentModles';

interface StudentFormProps {
    formIsActive: boolean,
    updatingStudent: StudentResponseModel | null,
    APICreateRequest: (student: StudentRequestModel) => void,
    APIEditRequest: (id: number, student: StudentRequestModel) => void,
}

export const StudentForm: React.FC<StudentFormProps> = ({ formIsActive, updatingStudent, APICreateRequest, APIEditRequest }) => {

    const name = useInput('', 'text', {require: true, minLength: 4});
    const surname = useInput('', 'text', {require: true,  minLength: 4});
    const email = useInput('', 'email', {require: true});
    const phone = useInput('', 'text', {require: true, minLength: 9});
    const [formIsValid, setValidForm] = useState(false);

    useEffect(() => {
        if(updatingStudent) 
            return isUpdateMode(updatingStudent);
        isCreateMode();
    }, [formIsActive])

    useEffect(() => {
        validForm();
    }, [name.isValid, surname.isValid, email.isValid, phone.isValid])

    const validForm = () => {
        if(name.isValid && surname.isValid && email.isValid && phone.isValid)
            return setValidForm(true);
        setValidForm(false);
    }

    const isUpdateMode = (student: StudentRequestModel) => {
        name.setValue(student.Name);
        surname.setValue(student.Surname);
        email.setValue(student.Email);
        phone.setValue(student.Phone);
        name.setDirty(true);
        surname.setDirty(true);
        phone.setDirty(true);
        email.setDirty(true);
    }

    const isCreateMode = () => {
        name.resetInput(); 
        surname.resetInput();
        email.resetInput();
        phone.resetInput();
    }

    const createStudentRequest = () => {
        let student = new StudentRequestModel(name.value, surname.value, email.value, phone.value);
        APICreateRequest(student);
    }

    const updateStudentRequest = () => {
        if(updatingStudent === null) return;
        let student = new StudentRequestModel(name.value, surname.value, email.value, phone.value);
        APIEditRequest(updatingStudent.Id, student);
    }

    return (
        <>
            <h1>{updatingStudent ? 'Update Student' : 'Create Student'}</h1>
            <form>
                <Input label="Name" onChange={name.onChange} onBlur={name.onBlur} value={name.value} error={name.error}/>
                <Input label="Surname" onChange={surname.onChange} onBlur={surname.onBlur} value={surname.value} error={surname.error}/>
                <Input label="Email" onChange={email.onChange} onBlur={email.onBlur} value={email.value} error={email.error}/>
                <Input label="Phone" onChange={phone.onChange} onBlur={phone.onBlur} value={phone.value} error={phone.error}/>
                <input type="submit" disabled = {!formIsValid} onClick={updatingStudent ? updateStudentRequest : createStudentRequest} />
            </form>
        </>
    )
}