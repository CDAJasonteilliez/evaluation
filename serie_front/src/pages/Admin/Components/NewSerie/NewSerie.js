import { addSerie } from "../../../../apis/series";
import SerieForm from "../SerieForm/SerieForm";

export default function NewSerie() {


    return (
        <>
            <h1 className={`mb20`}>Ajouter une série</h1>
            <SerieForm serie={null} fonction={addSerie} />
        </>
    )
}