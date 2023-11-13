import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
// import MobileMenu from "./components/MobileMenu";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <NavLink to="/" className={`mr10 tdn`}>
          <img src={logo} alt="logo du blog" />
        </NavLink>
      </div>
      { user ? (
        <ul>
          <NavLink className={`mr10 btn btn-primary`}>
            <span onClick={() => setUser(null)}>Logout</span>
          </NavLink>
          <NavLink to="/favorites" className={`mr10 btn btn-primary-reverse`}>
            <span>Favorites</span>
          </NavLink>
          <NavLink to="/profile" className={`mr10 btn btn-primary`}>
            <span>Profile</span>
          </NavLink>
          { user.admin === 1 ? (
            <NavLink to="/admin" className={`mr10 btn btn-admin`}>
              <span>Admin</span>
            </NavLink>) : ("")
          }
        </ul>
      ) : (
        <ul>
          <NavLink to="/login" className={`mr10 btn btn-primary`}>
            <span>Login</span>
          </NavLink>
          <NavLink to="/register" className={`mr10 btn btn-primary-reverse`}>
            <span>Register</span>
          </NavLink>
        </ul>
      )
    }
      {/* <i
        onClick={() => setShowMenu(true)}
        className={`fas fa-bars mr10 ${styles.mobileHeader}`}
      ></i>
       {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className={`calc`}></div>
          <MobileMenu />
        </>
      )} */}
    </header>
  );
}
