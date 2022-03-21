import React, { useContext } from 'react';
import { NoteContext } from '../NoteSegment/NoteSegment';
import styles from './Note.module.css'

import { INoteModel } from '../../../interfaces/models'


interface NoteProps {
    note: INoteModel
}

export const Note: React.FC<NoteProps> = ({ note }) => {

    const contextValue = useContext(NoteContext);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        contextValue?.setValue(note);
    }
    
    const onClickHandler = () => {
        contextValue?.setValue(note);
        contextValue?.setModalActive(true);
    }

    return(
        <div className={styles.container} onClick={onClickHandler}  draggable={true} onDragStart={(e) => dragStartHandler(e)}>
                <h3>{note.Title}</h3>
                <p>{note.Text}</p>
        </div>
    );
}