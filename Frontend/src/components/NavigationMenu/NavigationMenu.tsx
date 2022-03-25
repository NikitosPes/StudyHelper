import React from 'react';
import styles from './NavigationMenu.module.css';

import { Link, Outlet } from 'react-router-dom';

const logOutIcon = require('../../assets/images/log-out-icon.png');
const settingIcon = require('../../assets/images/setting-icon.png');

export const NavigationMenu: React.FC = () => {
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.links}>
                    <Link to="/" className={styles.logoLink}>StudyHelp</Link>
                    <Link to="group" className={styles.link}>Group</Link>
                    <Link to="notes" className={styles.link}>Notes</Link>
                    <Link to="schedule" className={styles.link}>Schedule</Link>
                    <Link to="subjects" className={styles.link}>Subjects</Link>
                </nav>

                <section className={styles.supportLinks}>
                    <Link to="settings" className={styles.link}><img className={styles.icon} src={settingIcon}/></Link>
                    <Link to="login" className={styles.link}><img className={styles.icon} src={logOutIcon}/></Link>
                </section>
            </header>
        </>
    );
}