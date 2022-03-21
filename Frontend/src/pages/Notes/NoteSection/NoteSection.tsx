import React, { useState, useEffect, useContext, ReactNode } from "react";
import { NoteContext } from "../NoteSegment/NoteSegment";
import styles from './NoteSection.module.css'

import { Note } from "../Note/Note";

import { INoteModel } from '../../../interfaces/models'


interface NoteSectionProps {
    notes: INoteModel[],
    priority: number,
}

export const NoteSection: React.FC<NoteSectionProps> = ({ notes, priority }) => {

    const MAX_CELLS = 6;
    const [cells, setCells] = useState<ReactNode []>([]);
    const contextValue = useContext(NoteContext);

    useEffect(() => {
        setCells(initSectionWithNotes(notes));
    }, [notes])

    const initSectionWithNotes = (notes: INoteModel[]): React.ReactNode [] => {
        let cells: ReactNode [] = []; 
        for(let i = 0; i < MAX_CELLS; i++) {
            if(i < notes.length) {
                cells.push(<Note note={notes[i]} key={i}/>);
                continue;
            } 
            cells.push(<div key={i}></div>)
        }
        return cells;
    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.style.background = 'black'
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = 'none'
    }


    const dropHandler = (e: React.DragEvent<HTMLDivElement>, newNote: INoteModel) => {
        e.preventDefault();
        contextValue?.changePriority(newNote, priority);
        setCells(initSectionWithNotes(notes));
        e.currentTarget.style.background = 'none'
    }

    return(
        <div className={styles.section} onDragOver={(e)=>dragOverHandler(e)} 
            onDrop={(e)=>dropHandler(e, contextValue!.value!)} onDragLeave={(e) => dragLeaveHandler(e)}>
            {cells}
        </div>
    )
}