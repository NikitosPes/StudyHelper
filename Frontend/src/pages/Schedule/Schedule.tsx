import React, { useState, useEffect } from 'react'
import API from '../../helpers/api'
import styles from './Schedule.module.css'

import { ScheduleSegment } from './ScheduleSegment/ScheduleSegment'
import { ScheduleResponseModel } from '../../models/ScheduleModels'


const initData = {
    monday: [], 
    tuesday: [], 
    wednsday: [], 
    thursday: [], 
    friday: [], 
    saturday: []
}

export const Schedule: React.FC = () => {

    const [data, setData] = useState<ScheduleResponseModel>(initData);
    const times = ['8:30', '10:25', '12:20', '14:15','16:10', '18.30'];

    useEffect(()=> {
        API.get('/schedule').then((response) => setData(response.data));
    }, [])

    return(
        <div className={styles.container}>
            <ScheduleSegment ScheduleRows={data.monday} title='Monday'/>
            <ScheduleSegment ScheduleRows={data.tuesday} title='Thuesday'/>
            <ScheduleSegment ScheduleRows={data.wednsday} title='Wednesday'/>
            <ScheduleSegment ScheduleRows={data.thursday} title='Thursday'/>
            <ScheduleSegment ScheduleRows={data.wednsday} title='Friday'/>
            <ScheduleSegment ScheduleRows={data.friday} title='Saturday'/>
        </div>
    );
}