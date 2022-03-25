import React, { useState, useEffect } from "react";
import styles from './NoteForm.module.css'

import { useInput } from "../../hooks/useInput";
import { Input } from "../ControledInput/Input";
import { NoteRequestModel, NoteResponseModel } from '../../models/NoteModels'

interface NoteFormProps {
    formIsActive: boolean,
    updatingNote: NoteResponseModel | null
    APICreateRequest: (note: NoteRequestModel) => void,
    APIUpdateRequest: (noteId: number, note: NoteRequestModel) => void
}


export const NotesFrom: React.FC<NoteFormProps> = ({ formIsActive, updatingNote, APICreateRequest, APIUpdateRequest }) => {

    const title = useInput('', 'text', {require: true});
    const text = useInput('', 'text', { require: true });
    const [notePriority, setNotePriority] = useState<undefined | number>(undefined);
    const [formIsValid, setValidForm] = useState<boolean>(false);

    useEffect(() => {
        if(updatingNote)
            return isUpdatingMode(updatingNote);
        isCreateMode();
    }, [formIsActive])

    useEffect(() => {
        validForm();
    }, [title.isValid, text.isValid, notePriority])

    const validForm = () => {
        if(updatingNote) {
            if(title.isValid && text.isValid && notePriority !== undefined) return setValidForm(true);
            return setValidForm(true);
        }
        if(title.isValid && text.isValid && notePriority) return setValidForm(true);
        setValidForm(false);
    }

    const isUpdatingMode = (updatingNote: NoteResponseModel) => {
        title.setValue(updatingNote.Title);
        text.setValue(updatingNote.Text);
        title.setDirty(true);
        text.setDirty(true);
    }

    const isCreateMode = () => {
        title.resetInput();
        text.resetInput();
        setNotePriority(undefined);
    }

    const createNoteRequest = () => {
        let note = new NoteRequestModel(title.value, text.value, notePriority!);
        APICreateRequest(note);
    }

    const updateNoteRequest = () => {
        if(updatingNote === null) return;
        let note = new NoteRequestModel(title.value, text.value, notePriority!);
        APIUpdateRequest(updatingNote.Id, note);
    }
    
    return(
        <>
            <h1>{updatingNote ? 'Udate Note' : 'Create Note'}</h1>
            <form>
                <Input label="Title" onChange={title.onChange} onBlur={title.onBlur} value={title.value} error={title.error}/>
                <Input label="Text" onChange={text.onChange} onBlur={text.onBlur} value={text.value} error={text.error}/>
                {updatingNote ? null : <ChoosePriorityNoteBlock setPriority={setNotePriority}/>}
                <button onClick={updatingNote ? updateNoteRequest : createNoteRequest} disabled={!formIsValid}>Submit</button>
            </form>
        </>
    )
}


const ChoosePriorityNoteBlock: React.FC<{setPriority:(priority: number) => void}> = ({ setPriority }) => {

    const parseToIntAndSetPriority = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        let priority = Number.parseInt(e.currentTarget.value);
        setPriority(priority);
    }

    return (
        <>
            <input type="radio" name="taskPriority" value={1} onClick={e => parseToIntAndSetPriority(e)}/>
            <label className={styles.urgentImportantLable}>Urgent Important</label><br/>
            <input type="radio" name="taskPriority" value={2} onClick={e => parseToIntAndSetPriority(e)}/>
            <label className={styles.urgentNotImportantLable}> Urgent not important</label><br/>
            <input type="radio" name="taskPriority" value={3} onClick={e => parseToIntAndSetPriority(e)}/>
            <label className={styles.notUrgentImportantLable}> Not urgent important </label><br/>
            <input type="radio" name="taskPriority" value={4} onClick={e => parseToIntAndSetPriority(e)}/>
            <label className={styles.notUrgentNotImportantLable}> Not urgent not important</label><br/>
        </>
    )
}