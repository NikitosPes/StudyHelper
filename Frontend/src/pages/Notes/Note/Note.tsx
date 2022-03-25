import React, { useContext } from 'react';

import { NoteContext } from '../NoteSegment/NoteSegment';
import { NoteResponseModel } from '../../../models/NoteModels';

import styles from './Note.module.css';

export const Note: React.FC<{note: NoteResponseModel}> = ({ note }) => {

    const contextValue = useContext(NoteContext);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        contextValue?.setValue(note);
    }
    
    const onClickHandler = () => {
        contextValue?.setValue(note);
        contextValue?.setModalActive(true);
    }

    return(
        <div className={styles.noteContainer} onClick={onClickHandler}  draggable={true} onDragStart={(e) => dragStartHandler(e)}>
                <h3>{note.Title}</h3>
                <p>{note.Text}</p>
        </div>
    );
}