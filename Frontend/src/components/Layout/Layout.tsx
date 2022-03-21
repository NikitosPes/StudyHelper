import React from "react";
import styles from './Layout.module.css'

import { Outlet } from "react-router-dom";
import { NavigationMenu } from "../NavigationMenu/NavigationMenu";

export const Layout: React.FC = () => {
    return(
        <>
            <NavigationMenu/>
            
            <main className={styles.container}>
                <Outlet/>
            </main>
        </>
    ) 
}  