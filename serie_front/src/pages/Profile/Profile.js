import { Suspense, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink, Navigate, Outlet } from "react-router-dom";

import styles from './Profile.module.scss';

export default function Profile() {
  const { user } = useContext(UserContext);

  if (!user) {return <Navigate to="/" />}

    return (
      <div className="d-flex flex-column flex-fill container980">
          <ul className="d-flex p20">
              <li>
              <NavLink end to="" className={`mr10 tdn`}>
                  <span>Settings</span>
              </NavLink>
              </li>
              <li>
              <NavLink to="wishlist" className={`mr10 tdn`}>
                  <span>Wishlist</span>
              </NavLink> 
              </li>
              <li>
              <NavLink to="encours" className={`mr10 tdn`}>
                  <span>Mes séries</span>
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
