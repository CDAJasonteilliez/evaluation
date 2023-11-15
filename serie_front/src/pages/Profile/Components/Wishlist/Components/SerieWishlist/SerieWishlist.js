import styles from './SerieWishlist.module.scss';

export default function SerieWishlist({ serie, retirerWishlist }) {
    return (
        <div className={`d-flex align-items-center ${styles.serieWishlist} `}>
            <div className={`flex-fill ${styles.infoContainer}`}>
                <div className={`${styles.posterContainer}`}>
                    <img
                        src={`http://localhost:8000/series/${serie.poster}`}
                        alt={`poster ${serie.title}`}
                    />
                </div>
                <p><strong>{serie.title}</strong></p>
            </div>
            <button onClick={() => retirerWishlist(serie.idSerie)} className={`btn btn-admin-reverse ml20`}>
                Retirer
            </button>
        </div>
    )
}