import React, { useState, useEffect, ReactNode } from "react";
import styles from './ScheduleSegment.module.css'

import { ScheduleRowResponseModel } from '../../../models/ScheduleModels';

interface ScheduleSegmentProps { 
    ScheduleRows: ScheduleRowResponseModel [],
    title: string
}

export const ScheduleSegment: React.FC<ScheduleSegmentProps>  = ({ ScheduleRows, title }) => {

    const [rows, setRows] = useState<ReactNode []>([]);
    const times = ['8:30', '10:25', '12:20', '14:15','16:10', '18.30'];

    useEffect(()=> {
        setRows(initRowsForSegment(ScheduleRows));
    }, [ScheduleRows])

    const initRowsForSegment = (scheduleRows: ScheduleRowResponseModel []): ReactNode [] => {
        let rows: ReactNode [] = [];
        times.map((currentTime)=>{
            let added = false;
            for(let row of scheduleRows){
                if(row.Time === currentTime){
                    rows.push(<ScheduleRow subjectName={row.SubjectName}/>)
                    added = true;
                }
            }
            if(!added) rows.push(<ScheduleRow/>)
        })
        return rows;
    }

    return(
        <div className={styles.segment}>
            <h3>{title}</h3>
                {rows} 
        </div>
    )
}

const ScheduleRow: React.FC<{subjectName?: string}> = ({ subjectName }) => {
    //Refactor if statment
    return (
        <div className={styles.row}>
            {subjectName ? <p>{subjectName}</p> : <p></p>}
        </div>
    )
}