import { useParams } from "react-router-dom";
import { updateSerie } from "../../../../apis/series";
import SerieForm from "../SerieForm/SerieForm";
import { useContext } from "react";
import { SeriesContext } from "../../../../context/SeriesContext";

export default function ModifySerie() {
    const { id } = useParams();
    const { series } = useContext(SeriesContext);

    const serie = series.filter((s) => s.idSerie === Number(id))[0];

    return (
        <>
            <h1 className={`mb20`}>Modifier {serie.title}</h1>
            {series && 
                <SerieForm serie={serie} fonction={updateSerie}/>
            }

        </>
    )
}