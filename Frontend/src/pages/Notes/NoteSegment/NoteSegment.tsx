import React from "react";

import { ArraysOfNotes } from '../../../helpers/interfaces';
import { curentNoteType } from '../../../helpers/interfaces';

import { NoteSection } from "../NoteSection/NoteSection";

import styles from './NoteSegment.module.css';

interface NoteSegmentProps {
    notes: ArraysOfNotes,
    activateModal: (status: boolean) => void,
    currentNote: curentNoteType
}

export const NoteContext = React.createContext<curentNoteType | undefined>(undefined);

export const NoteSegment: React.FC<NoteSegmentProps> = ({ notes, currentNote, activateModal }) => {

    const clickAddButtonHandler = () => {
        currentNote.setValue(null);
        activateModal(true);
    }

    return(
        <NoteContext.Provider value={currentNote}>
            <div className={styles.container}>

                <div className={styles.urgentImportant}>
                    <NoteSection notes={notes.urgentImportant} priority={1}/>
                </div>
                <div className={styles.notUrgentImportant}>
                    <NoteSection notes={notes.notUrgentImportant} priority={2}/>
                </div>
                <div className={styles.urgentNotImportant}>
                    <NoteSection notes={notes.urgentNotImportant} priority={3}/>
                </div>
                <div className={styles.notUrgentNotImportant}>
                    <NoteSection notes={notes.notUrgentNotImportant} priority={4}/>
                </div>

                <button className={styles.addButton} onClick={clickAddButtonHandler}>Add</button>
            </div>
        </NoteContext.Provider>
    )
}