import { SeriesContext } from "../../../../context/SeriesContext";
import SerieAdmin from "./SerieAdmin/SerieAdmin";
import { useContext, useState } from "react";
import styles from './AllSeries.module.scss';
import { deleteSerie, getSeries } from "../../../../apis/series";


export default function AllSeries() {
    const { series, setSeries } = useContext(SeriesContext);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");

    const handleDelete = async (id) => {
        try {
            const response = await deleteSerie(id);
            if (response.message) {
                setFeedback(response.message);
            } else {
                setFeedbackGood(response.messageGood);
                const series  = await getSeries();
                setSeries(series);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <>
            <h1 className="mb20">Liste des séries</h1>
            {series.map((serie) => <SerieAdmin key={serie.idSerie} serie={serie} handleDelete={handleDelete} />)}
            {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
            {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}
        </>
    )
}