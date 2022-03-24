import React, { useState, useEffect } from 'react'
import API from '../../api'
import styles from './Subjects.module.css'

import { SubjectBlock } from './SubjectBlock/SubjectBlock';
import { SubjecResponseModel } from '../../models/SubjectModels'

interface SubjectsProps {
    exam: SubjecResponseModel [],
    credit: SubjecResponseModel []
}

export const Subjects: React.FC = () => {

    const [data, setData] = useState<SubjectsProps>();

    useEffect(()=> {
        API.get('/subjects')
        .then(response => setData(response.data))
    }, [])

    return(
        <div className={styles.conteiner}>
            <h2>Exam subjects</h2>
            <section className={styles.examSubjects}>
                {data?.exam.map(subject => {
                        return <SubjectBlock subject={subject} type='exam' key={subject.Id}/>
                    })}
            </section>

            <h2>Credit subjects</h2>
            <section className={styles.creditSubjects}>
                {data?.credit.map(subject => {
                    return <SubjectBlock subject={subject} type='credit' key={subject.Id}/>
                })}
            </section>
        </div>
    )
}