import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

import styles from './Admin.module.scss';

export default function Admin() {
    return (
        <div className="d-flex flex-column flex-fill container980">
            <ul className="d-flex p20">
                <li>
                <NavLink end to="" className={`mr10 tdn`}>
                    <span>Ajouter une série</span>
                </NavLink>
                </li>
                <li>
                <NavLink to="all" className={`mr10 tdn`}>
                    <span>Liste des séries</span>
                </NavLink> 
                </li>
            </ul>
            <div className={`card p20 mb20 d-flex flex-column flex-fill ${styles.contentCard}`}>
                <Suspense >
                    <Outlet />  
                </Suspense>
            </div>
        </div>
    )
}