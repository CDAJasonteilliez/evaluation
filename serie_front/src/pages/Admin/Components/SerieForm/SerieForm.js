import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useRef, useState } from "react";
import { isFileExtValid, isFileToBig } from "../../../../utils/utils";
import { getSeries } from "../../../../apis/series";

import styles from './SerieForm.module.scss';
import { SeriesContext } from "../../../../context/SeriesContext";

export default function SerieForm( {serie , fonction } ) {
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const { setSeries } = useContext(SeriesContext);

    const posterRef = useRef();

    const isNew = serie === null ? true : false;

    const yupSchema = yup.object({
        title: yup
            .string()
            .required("Le champ est obligatoire."),
        poster: yup
            .mixed()
            .test(
                "is-valid-type", "Sélectionner un type d'image valide (jpg, gif, png, jpeg, svg, webp).",
                () => isFileExtValid(posterRef, isNew)
            )
            .test(
                "is-valid-size", "Le fichier est trop volumineux (1Mb max)",
                () => isFileToBig(posterRef, 10000000, isNew)
            ),
        year: yup
            .number()
            .typeError('Le champ est obligatoire et doit contenir un nomber.')
            .integer('Année invalide')
            .required("Le champ est obligatoire."),
        resume: yup
            .string()
            .required("Le champ est obligatoire."),
        numberSeason: yup
            .number()
            .typeError('Le champ est obligatoire et doit contenir un nomber.')
            .integer('nombre invalide')
            .required("Le champ est obligatoire."),   
        imdbNote: yup
            .number("Le champ est obligatoire.")
            .typeError('Le champ est obligatoire et doit contenir un nomber.')
            .required("Le champ est obligatoire.")
            .min(0, "Valeur minimal 0.")
            .max(10, "Valeur maximal 10."),
        sensCritiqueNote: yup
            .number("Le champ est obligatoire.")
            .typeError('Le champ est obligatoire et doit contenir un nomber.')
            .required("Le champ est obligatoire.")
            .min(0, "Valeur minimal 0.")
            .max(10, "Valeur maximal 10."),
        country: yup
            .string()
            .required("Le champ est obligatoire."),
    });

    const defaultValues = {
        title: serie === null ? "" : serie.title,
        year: serie === null ? "" : serie.year,
        resume: serie === null ? "" : serie.resume,
        numberSeason: serie === null ? "" : serie.numberSeason,
        still: serie === null ? "" : serie.still,
        imdbNote: serie === null ? "" : serie.imdbNote,
        sensCritiqueNote: serie === null ? "" : serie.sensCritiqueNote,
        country: serie === null ? "" : serie.country
    };

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });  

    const clearInputFile = () => {
        posterRef.current.value = ""; 
        posterRef.current.type = "text"; 
        posterRef.current.type = "file"; 
    }

    async function submit() {
        setFeedback("");
        setFeedbackGood("");
        const values = getValues();

        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('year', values.year);
        formData.append('resume', values.resume);
        formData.append('numberSeason', values.numberSeason);
        formData.append('still', values.still);
        formData.append('imdbNote', values.imdbNote);
        formData.append('sensCritiqueNote', values.sensCritiqueNote);
        formData.append('country', values.country);
        if (serie === null) {
            if (posterRef.current && posterRef.current.files[0]) {
            formData.append("poster", posterRef.current.files[0]);
            }
        } else {
            formData.append('idSerie', serie.idSerie);
            formData.append('oldPoster', serie.poster);
            if (posterRef.current.files[0] === undefined) {
                formData.append('poster', null)
            } else {
                formData.append("poster", posterRef.current.files[0]);
            }
        }

        try {
            const response = await fonction(formData);
            if (response.message) {
            setFeedback(response.message);
            } else {
            setFeedbackGood(response.messageGood);
            const series  = await getSeries();
            setSeries(series);
            if (serie === null) {
                reset(defaultValues);
            }
            posterRef.current.value = ""; 
            posterRef.current.type = "text"; 
            posterRef.current.type = "file"; 
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submit)}>

                {/* titre de la série */}
                <div className="d-flex flex-column mb20">
                    <label htmlFor="title" className="mb10">Titre de la série</label>
                    <input {...register("title")} type="text" id="title" className={`flex-fill ${styles.input}`} />
                    {errors?.title && <p className={`${styles.feedback}`}>{errors.title.message}</p>}
                </div>

                {/* Poster */}
                {serie === null ? (
                    <div className="d-flex flex-column mb20">
                        <label htmlFor="poster" className="mb10">Poster</label>
                        <input
                            ref={posterRef}
                            type="file"
                            id="poster"
                            className={`flex-fill ${styles.input}`}
                        />
                        {errors?.poster && <p className={`${styles.feedback}`}>{errors.poster.message}</p>}
                    </div>
                ) : (
                    <div className="d-flex flex-column mb20">
                        <label className="mb10">Poster</label>
                        <div className={`d-flex ${styles.posterContainer}`}>
                            <img src={`http://localhost:8000/series/${serie.poster}`} alt={`${serie.title} affiche`} />
                            <div className="d-flex flex-fill flex-column">
                            <label htmlFor="poster" className="mb10">Nouveau poster</label>
                                <div className="d-flex flex-fill">
                                    <input
                                        ref={posterRef}
                                        type="file"
                                        id="poster"
                                        className={`flex-fill ${styles.input}`}
                                    />
                                    <button type="button" onClick={clearInputFile} className={`btn btn-admin-reverse ml20`}>Clear</button>
                                </div>
                                {errors?.poster && <p className={`${styles.feedback}`}>{errors.poster.message}</p>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Année de sortie */}
                <div className="d-flex flex-column mb20">
                    <label htmlFor="year" className="mb10">Année de sortie</label>
                    <input {...register("year")} type="number" id="year" className={`flex-fill ${styles.input}`} />
                    {errors?.year && <p className={`${styles.feedback}`}>{errors.year.message}</p>}
                </div>

                {/* Synopsis */}
                <div className="d-flex flex-column mb20">
                    <label htmlFor="resume" className="mb10">Synopsis</label>
                    <textarea {...register("resume")} id="resume" className={`flex-fill ${styles.textArea}`} rows={7}></textarea>
                    {errors?.resume && <p className={`${styles.feedback}`}>{errors.resume.message}</p>}
                </div>

                {/* Nombres de saisons */}
                <div className="d-flex flex-column mb20">
                    <label htmlFor="numberSeason" className="mb10">Nombres de saisons</label>
                    <input {...register("numberSeason")} type="number" id="numberSeason" className={`flex-fill ${styles.input}`} />
                    {errors?.numberSeason && <p className={`${styles.feedback}`}>{errors.numberSeason.message}</p>}
                </div>

                {/* En cours ? */}
                <div className="d-flex mb20 align-items-center">
                    <label htmlFor="still" className="mr10">En cours ?</label>
                    <input {...register("still")} type="checkbox" id="still" />
                </div>

                {/* Note IMDb */}
                <div className="d-flex flex-column mb20">
                    <label htmlFor="imdbNote" className="mb10">Note IMDb</label>
                    <input {...register("imdbNote")} type="number" step="0.01" id="imdbNote" className={`flex-fill ${styles.input}`} />
                    {errors?.imdbNote && <p className={`${styles.feedback}`}>{errors.imdbNote.message}</p>}
                </div>

                {/* Note Sens critiques */}
                <div className="d-flex flex-column mb20">
                    <label htmlFor="sensCritiqueNote" className="mb10">Note Sens Critique</label>
                    <input {...register("sensCritiqueNote")} type="number" step="0.01" id="sensCritiqueNote" className={`flex-fill ${styles.input}`} />
                    {errors?.sensCritiqueNote && <p className={`${styles.feedback}`}>{errors.sensCritiqueNote.message}</p>}
                </div>

                {/* Pays de la série */}
                <div className="d-flex flex-column mb20">
                    <label htmlFor="country" className="mb10">Pays de la série</label>
                    <input {...register("country")} type="text" id="country" className={`flex-fill ${styles.input}`} />
                    {errors?.country && <p className={`${styles.feedback}`}>{errors.country.message}</p>}
                </div>

                {/* Sauvegarder */}
                <button className="btn btn-primary">Submit</button>
                
                {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}
            </form>
        </>
    )
}