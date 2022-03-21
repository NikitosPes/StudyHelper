import React from "react";
import styles from './SubjectBlock.module.css'

import { ISubjectModel } from '../../../interfaces/models';

const profilePicture = require('../../../assets/images/profile-picture.png');

interface SubjectBlockProps {
    type: 'exam' | 'credit',
    subject: ISubjectModel
}

export const SubjectBlock: React.FC<SubjectBlockProps> = ({ type, subject }) => {
    return (
        <div className={type === 'credit' ? styles.creditContainer : styles.examContainer} >
            <header className={styles.header}>
                <img className={styles.teacherAvatar} src={profilePicture} alt="img" /> 
                <h2>{subject.Name}</h2>
            </header>
            <div className={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, doloremque. Cupiditate, alias. Eum, maxime ad libero a perspiciatis velit culpa nobis omnis commodi modi reiciendis animi voluptate cum dolor. Doloremque.</div>
        </div>
        
    )
}