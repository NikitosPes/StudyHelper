import React, { useEffect, useState } from "react";
import { useInput, errorstyles} from "../hooks/useInput";

import { StudentRequestModel } from '../interfaces/models'
import { IStudentModel } from '../interfaces/models'
import { Input } from "./ControledInput/Input";

interface StudentFormProps {
    formIsActive: boolean,
    updatingStudent: IStudentModel | null,
    APICreateRequest: (student: StudentRequestModel) => void,
    APIEditRequest: (student: StudentRequestModel, id: number) => void,
}

export const StudentForm: React.FC<StudentFormProps> = ({ formIsActive, updatingStudent, APICreateRequest, APIEditRequest }) => {

    const name = useInput('', 'text', {require: true, minLength: 4});
    const surname = useInput('', 'text', {require: true,  minLength: 4});
    const email = useInput('', 'email', {require: true});
    const phone = useInput('', 'text', {require: true, minLength: 9});
    const [formIsValid, setValidForm] = useState(false);

    useEffect(() => {
        console.log('form useEffect' + ' ' + updatingStudent?.Name)
        if(updatingStudent) 
            return isUpdateMode(updatingStudent);
        isCreateMode();
    }, [formIsActive])

    useEffect(() => {
        validForm();
        console.log('valid form useEffect')
    }, [name.value, surname.value, email.value, phone.value])

    const validForm = () => {
        if(name.isValid && surname.isValid && email.isValid && phone.isValid)
            return setValidForm(true);
        setValidForm(false);
    }

    const isUpdateMode = (student: StudentRequestModel) => {
        name.setNewValue(student.Name);
        console.log(`Valid of name ${name.isValid} value ${name.value}`)
        surname.setValue(student.Surname);
        email.setValue(student.Email);
        phone.setValue(student.Phone);
    }

    const isCreateMode = () => {
        name.resetInput(); 
        surname.resetInput();
        email.resetInput();
        phone.resetInput();
    }

    return (
        <>
            <h1>{updatingStudent ? 'Update Student' : 'Create Student'}</h1>
            <form>
                <Input label="Name" onChange={name.onChange} onBlur={name.onBlur} value={name.value} error={name.error}/>
                <Input label="Surname" onChange={surname.onChange} onBlur={surname.onBlur} value={surname.value} error={surname.error}/>
                <Input label="Email" onChange={email.onChange} onBlur={email.onBlur} value={email.value} error={email.error}/>
                <Input label="Phone" onChange={phone.onChange} onBlur={phone.onBlur} value={phone.value} error={phone.error}/>
                <input type="submit" disabled = {!formIsValid} />
            </form>
        </>
    )
}