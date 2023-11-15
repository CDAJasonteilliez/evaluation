import { useContext, useState } from "react";
import { SeriesContext } from "../../../../context/SeriesContext";
import { UserContext } from "../../../../context/UserContext";
import SerieEnCours from "./Components/SerieEnCours/SerieEnCours";
import { changeEnCours } from "../../../../apis/likes";

export default function EnCours() {
    const { user, setUser } = useContext(UserContext);
    const { series } = useContext(SeriesContext);
    const [key, setKey] = useState(0);

    const modifierEnCours = async (id, value) => {
        const values= {
            idUser: user.idUser,
            idSerie: id,
            enCours: value,
        }
        const response = await changeEnCours(values);
        if (response.messageGood){
            const newUser = user;
            const likeID = user.likes.findIndex((el) => el.idSerie === id);
            newUser.likes[likeID].enCours = value;
            setUser(newUser);
            setKey(key + 1);
        }
    }

    return (
        <>
            <h1 className="mb20">Mes séries</h1>
            {user.likes
                .filter((el) => el.enCours > 0)
                .map((el) => 
                    <SerieEnCours 
                        key={el.idSerie} 
                        serie={series.filter((serie) => serie.idSerie === el.idSerie)[0]}
                        enCoursData={user.likes.filter((like)=> like.idSerie === el.idSerie)[0].enCours}
                        modifierEnCours={modifierEnCours}
                    />
                )
            }
        </>
    )
}