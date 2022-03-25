import React, { useState, useEffect } from 'react'

import { NoteSegment } from './NoteSegment/NoteSegment';
import { Modal } from '../../components/Modal/Modal';
import { NotesFrom } from '../../forms/NoteForm/NotesForm';

import { ArraysOfNotes } from '../../helpers/interfaces';
import { NoteRequestModel, NoteResponseModel } from '../../models/NoteModels';

import API from '../../helpers/api';
import styles from './Notes.module.css';

const initServerData  = {
    urgentImportant: [],
    notUrgentImportant: [],
    urgentNotImportant: [],
    notUrgentNotImportant: []
}

export const Notes: React.FC = () => {

    const [data, setData] = useState<ArraysOfNotes>(initServerData);
    const [currentNote, setCurrentNote] = useState<NoteResponseModel | null>(null);
    const [modalActive, setModalActive] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const response = await API.get('/notes');
            const { ...result } = response.data;
            setData(result);
        } catch(e) {
            console.log(`Error: ${e}`);
        }
    }

    const createNoteRequest = (note: NoteRequestModel) => {
        API.post('notes' , {note});
    }

    const updateNoteRequest = (noteId: number, note: NoteRequestModel) => {
        API.put(`notes/${noteId}`, {note});
    }

    const changeNotePriority = (note: NoteResponseModel,  newPriority: number) => {
        if(note.Priority === newPriority) return;
        let tempData = addNotetoNewSection(note, newPriority, data);
        note.Priority = newPriority;
        API.put(`notes/${note.Id}`, {note})
        setData(tempData);
    }

    const removeChangedNoteFromSection = (note: NoteResponseModel, noteArr: ArraysOfNotes): ArraysOfNotes => {
        let result = {...noteArr}
        if(note.Priority === 1) result.urgentImportant = result.urgentImportant.filter(item => item.Id !== note.Id);
        if(note.Priority === 2) result.notUrgentImportant = result.notUrgentImportant.filter(item => item.Id !== note.Id);
        if(note.Priority === 3) result.urgentNotImportant = result.urgentNotImportant.filter(item => item.Id !== note.Id);
        if(note.Priority === 4) result.notUrgentNotImportant = result.notUrgentNotImportant.filter(item => item.Id !== note.Id);
        return result;
    }

    const addNotetoNewSection = (note: NoteResponseModel,  newPriority: number, noteArr: ArraysOfNotes) => {
        let result = removeChangedNoteFromSection(note, noteArr);
        note.Priority = newPriority;
        if(newPriority === 1) result.urgentImportant.push(note);
        if(newPriority === 2) result.notUrgentImportant.push(note);
        if(newPriority === 3) result.urgentNotImportant.push(note);
        if(newPriority === 4) result.notUrgentNotImportant.push(note);
        return result;
    }

    return (
        <div className={styles.container}>
            <div className={styles.horizontalTitles}>
                <h3>Urgent</h3>
                <h3>Not urgent</h3>
            </div>

            <div className={styles.verticalTitels}>
                <h3>Important</h3>
                <h3>Not important</h3>
            </div>
            <NoteSegment notes={data} activateModal={setModalActive} currentNote={{value: currentNote, setValue: setCurrentNote, changePriority: changeNotePriority, setModalActive: setModalActive}}/>
            <Modal active={modalActive} setActive={setModalActive} 
                children={<NotesFrom APICreateRequest={createNoteRequest} APIUpdateRequest={updateNoteRequest} updatingNote={currentNote} formIsActive={modalActive}/>} />
            
        </div>
    )
}