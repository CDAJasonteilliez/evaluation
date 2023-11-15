import { useContext, useState } from "react";
import { UserContext } from "../../../../context/UserContext";

import styles from './Settings.module.scss';
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../../../../apis/users";

export default function Settings() {
    const { user, setUser } = useContext(UserContext);
    const [popup, setPopup] = useState(0);
    const navigate = useNavigate();

    const handlerModifierProfile = () => {
        console.log("todo : modifier profile")
    }
    const handlerModifierPassword = () => {
        console.log("todo : modifier password")
    }
    const handlerPopup = (value) => {
        setPopup(value);
    }

    const handlerSupprimer = async () => {
        try {
            const response = await deleteUser(user.idUser)
            if(response.messageGood) {
                setUser(null);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`${styles.settingsContainer}`}>
            <h1>Bonjour {user.pseudo} !</h1>
            <div className={`${styles.Container}`}>
                <div className={`${styles.avatarContainer}`}>
                    {user.avatar === null ?
                        <img
                        src={`http://localhost:8000/avatars/avatar.png`}
                        alt="User Avatar"
                        />
                    :
                        <img
                            src={`http://localhost:8000/avatars/${user.avatar}`}
                            alt="User Avatar"
                        />
                    }

                </div>
                <div className={`${styles.infoContainer}`}>
                    <p><strong>Nom d'utilisateur : </strong>{user.pseudo}</p>
                    <p><strong>Adresse mail : </strong>{user.email}</p>
                </div>
            </div>
            <div className={`${styles.buttonContainer}`}>
                <Link className={`mr10 btn btn-primary-reverse`} onClick={handlerModifierProfile}>
                    <span>Modifier profile</span>
                </Link>
                <Link className={`mr10 btn btn-primary-reverse`} onClick={handlerModifierPassword}>
                    <span>Modifier mot de passe</span>
                </Link>
                <Link className={`mr10 btn btn-admin`} onClick={() => handlerPopup(1)}>
                    <span>Supprimer profile</span>
                </Link>
            </div>
            {popup ?
                <div className={`${styles.popupContainer}`}>
                    <div className={`${styles.popup}`}>
                        <div className={`${styles.popupText}`}>
                            <p>Êtes vous sûre ?</p>
                            <p className={`${styles.popupAlert}`}>Attention, cette action est irréverssible !</p>
                        </div>
                        <div className={`${styles.popupButton}`}>
                            <Link className={`btn btn-primary-reverse`} onClick={() => handlerPopup(0)}>
                                <span>Annuler</span>
                            </Link>
                            <Link className={`btn btn-admin`} onClick={handlerSupprimer}>
                                <span>Supprimer profile</span>
                            </Link>
                        </div>
                    </div>
                </div> 
            : ""}
        </div>

    )
}