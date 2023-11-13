import { Link } from 'react-router-dom';
import styles from './SerieAdmin.module.scss';

export default function SerieAdmin({ serie, handleDelete }) {

    return (
        <div className={`d-flex align-items-center ${styles.serieAdmin} `}>
            <div className={`flex-fill`}>
                <p><strong>{serie.title}</strong></p>
            </div>
            <ul>
                <Link to={`/admin/update/${serie.idSerie}`} className={`mr10 btn btn-primary-reverse`}>
                    <span>Modifier</span>
                </Link>
                <Link  onClick={() => handleDelete(serie.idSerie)} className={`mr10 btn btn-admin`}>
                    <span>Supprimer</span>
                </Link>
            </ul>
        </div>
    )
}