import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";

import styles from './Settings.module.scss';
import { Link } from "react-router-dom";

export default function Settings() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div className={`${styles.settingsContainer}`}>
            <h1>Bonjour {user.pseudo} !</h1>
            <div className={`${styles.infoContainer}`}>
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
                <div>
                    <p><strong>Nom d'utilisateur : </strong>{user.pseudo}</p>
                    <p><strong>Adresse mail : </strong>{user.email}</p>
                </div>
            </div>
            <div>
            </div>
        </div>

    )
}