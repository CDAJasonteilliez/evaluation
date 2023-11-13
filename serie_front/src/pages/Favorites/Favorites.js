// copier coller de Hompage avec un filter en plus.
import { SeriesContext } from "../../context/SeriesContext";
import { UserContext } from "../../context/UserContext";
import styles from "./Favorites.module.scss";
import SerieFav from "./Components/SerieFav/SerieFav";
import { useContext, useEffect, useState } from "react";

export default function Favorites() {
  const { series } = useContext(SeriesContext);
  const { user } = useContext(UserContext);
  const [filter, setFilter] = useState("");
  const [key, setKey] = useState(0);

  const handleInput = (e) => {
    const search = e.target.value;
    setFilter(search.trim().toLowerCase());
  };

  return (
    <div className="d-flex flex-column flex-fill container">
      <h1 className="mb20">Découvrez nos dernières critiques</h1>
      <div
        className={`card p20 mb20 d-flex flex-column flex-fill ${styles.contentCard}`}
      >
        <div
          className={`d-flex justify-content-center align-items-center my30 ${styles.searchBar}`}
        >
          <i className="fas fa-magnifying-glass mr10"></i>
          <input
            onInput={handleInput}
            className="flex-fill"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className={`${styles.grid}`}>
          {series
            .filter(
              (serie) =>
                user.likes.filter(
                  (el) => serie.idSerie === el.idSerie && el.likes === 1
                ).length != 0
            )
            .filter((serie) => serie.title.toLowerCase().includes(filter))
            .map((serie) => {
              return (
                <SerieFav key={serie.idSerie} serie={serie} setKey={setKey} />
              );
            })}
        </div>
      </div>
    </div>
  );
}
