import { useContext, useEffect, useState } from "react";
import styles from "./Serie.module.scss";
import { UserContext } from "../../../context/UserContext";
import { changeLikes } from "../../../apis/likes";
import { Link } from "react-router-dom";

export default function Serie({ serie }) {
  const { idSerie, title, poster } = serie;
  const { user, setUser } = useContext(UserContext);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (user !== null) {
      const temp = user.likes.filter((el) => el.idSerie === idSerie);
      if (temp.length !== 0) setLikes(temp[0].likes);
    }
  }, [user, idSerie]);

  const handleClick = async () => {
    const values = {
      idUser: user.idUser,
      idSerie: serie.idSerie,
      likes: likes ? 0 : 1,
    };
    const response = await changeLikes(values);
    if (response.messageGood) {
      const newUser = user;
      if (user.likes.filter((el) => el.idSerie === idSerie).length !== 0) {
        newUser.likes = newUser.likes.filter((el) => el.idSerie !== idSerie);
      }
      newUser.likes.push(response.data);
      setUser(newUser);
      setLikes(response.data.likes);
    }
  };

  return (
    <div className={`${styles.serie}`}>
      <Link to={`details/${idSerie}`}>
      <div className={`${styles.imgContainer}`}>
        <img
          src={`http://localhost:8000/series/${poster}`}
          alt={`${title} affiche`}
        />
      </div>
      </Link>
      <div
        className={`${styles.title} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb10">{title}</h3>
        {user && (
          <i
            className={`fas fa-heart ${styles.heart} ${
              likes ? "text-liked" : ""
            }`}
            onClick={handleClick}
          ></i>
        )}
      </div>
    </div>
  );
}
