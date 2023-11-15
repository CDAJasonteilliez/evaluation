import styles from './SerieEnCours.module.scss';

export default function SerieEnCours({ serie, enCoursData, modifierEnCours }) {

    return (
        <div className={`d-flex align-items-center ${styles.serieEnCours} `}>
            <div className={`flex-fill ${styles.infoContainer}`}>
                <div className={`${styles.posterContainer}`}>
                    <img
                        src={`http://localhost:8000/series/${serie.poster}`}
                        alt={`poster ${serie.title}`}
                    />
                </div>
                <p><strong>{serie.title}</strong></p>
            </div>
            <p>Série {enCoursData == 1 ? "en cours" : "terminé"}</p>
            <button onClick={() => modifierEnCours(serie.idSerie, 1)} className={`btn btn-primary-reverse ml20`}>
                En cours
            </button>
            <button onClick={() => modifierEnCours(serie.idSerie, 2)} className={`btn btn-primary ml20`}>
                Terminer
            </button>
            <button onClick={() => modifierEnCours(serie.idSerie, 0)} className={`btn btn-admin-reverse ml20`}>
                Retirer
            </button>
        </div>
    )
}