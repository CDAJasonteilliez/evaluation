import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SeriesContext } from "../../context/SeriesContext";
import { UserContext } from "../../context/UserContext";
import { changeComments, changeEnCours, changeMaNote, changeWishList, getComments } from "../../apis/likes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import styles from "./Details.module.scss";

export default function Details() {
    const { id } = useParams();
    const { series } = useContext(SeriesContext);
    const { user, setUser } = useContext(UserContext);
    const [serieData, setSerieData] = useState(series.filter((el) => el.idSerie === Number(id))[0])
    const [userLikeData, setUserLikeData] = useState(null);

    useEffect(() => {
        if (user!== null) {
            const userData = user.likes.filter((el) => el.idSerie === Number(id))[0]
            if (userData === undefined) {
                setUserLikeData(null)
            } else {
                setUserLikeData(userData);
            }
        }
    },[])

    //*********************************************//
    /*                 Gestion ma note             */
    const [hoverRating, setHoverRating] = useState(0);
    const [isHover, setIsHover] = useState(false);

    const handleClickMaNote = async (value) => {
        const values = {
            idUser: user.idUser,
            idSerie: serieData.idSerie,
            maNote: value
        }
        if (userLikeData !== null && userLikeData.maNote === value) values.maNote = 0
        const response = await changeMaNote(values);
        if (response.messageGood){
            const newUser = user;
            if (userLikeData !== null) {
                newUser.likes = newUser.likes.filter((el) => el.idSerie !== Number(id));
            }
            newUser.likes.push(response.data);
            setUser(newUser);
            setUserLikeData(response.data);
        } 
    }

    const handleMouseEnter = (value) => {
        setIsHover(true);
        setHoverRating(value);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }
    //*********************************************//

    //*********************************************//
    /*                 Gestion en cours            */
    const handleClickEnCours = async () => {
        const values = {
            idUser: user.idUser,
            idSerie: serieData.idSerie,
            enCours: 1
        }
        if (userLikeData !== null ) values.enCours = userLikeData.enCours ? 0 : 1
        const response = await changeEnCours(values);
        if (response.messageGood){
            const newUser = user;
            if (userLikeData !== null) {
                newUser.likes = newUser.likes.filter((el) => el.idSerie !== Number(id));
            }
            newUser.likes.push(response.data);
            setUser(newUser);
            setUserLikeData(response.data);
        } 
    }
    //*********************************************//

    //*********************************************//
    /*                 Gestion wish list           */
    const handleClickWishList = async () => {
        const values = {
            idUser: user.idUser,
            idSerie: serieData.idSerie,
            wishList: 1
        }
        if (userLikeData !== null ) values.wishList = userLikeData.wishList ? 0 : 1
        const response = await changeWishList(values);
        if (response.messageGood){
            const newUser = user;
            if (userLikeData !== null) {
                newUser.likes = newUser.likes.filter((el) => el.idSerie !== Number(id));
            }
            newUser.likes.push(response.data);
            setUser(newUser);
            setUserLikeData(response.data);
        } 
    }
    //*********************************************//

    //*********************************************//
    /*               Gestion commentaire           */
    const [feedbackGood, setFeedbackGood] = useState("");
    const [feedback, setFeedback] = useState("");
    
    const yupSchema = yup.object({
        comments: yup
            .string()
            .required("Le champ doit être remplie")
            .max(500, "500 caractères maximum.")
    })

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
      } = useForm({
        mode: "onChange",
        resolver: yupResolver(yupSchema),
      });

    async function submit() {
        setFeedbackGood("");
        const values = getValues();
        values["idUser"] = user.idUser;
        values["idSerie"] = serieData.idSerie;
        const response = await changeComments(values);
        if (response.messageGood){
            const newUser = user;
            if (userLikeData !== null) {
                newUser.likes = newUser.likes.filter((el) => el.idSerie !== Number(id));
            }
            newUser.likes.push(response.data);
            setUser(newUser);
            setUserLikeData(response.data);
            setFeedbackGood("Merci pour votre commentaire.");            
            const res = await getComments(id);
            setCommentaire(res.data.filter((el)=> el.comments !== null));
            setTimeout(() => {
                setFeedbackGood("");
            }, 3000);
        } 
    }

    const deleteComments = async () => {
        const values = {
            idUser: user.idUser,
            idSerie: serieData.idSerie,
            comments: null
        }
        const response = await changeComments(values);
        if (response.messageGood){
            const newUser = user;
            if (userLikeData !== null) {
                newUser.likes = newUser.likes.filter((el) => el.idSerie !== Number(id));
            }
            newUser.likes.push(response.data);
            setUser(newUser);
            setUserLikeData(response.data);
            setFeedback("Commentaire supprimé avec succés.");
            const textarea = document.getElementById("comments");
            textarea.value = ""
            const res = await getComments(id);
            setCommentaire(res.data.filter((el)=> el.comments !== null));
            setTimeout(() => {
                setFeedback("");
            }, 3000);
        } 
    }
    
    //*********************************************//
    /*               Tous les commentaire          */
    const [commentaire, setCommentaire] = useState(null);
    useEffect( () => {
        const fetchComments = async () => {
            const response = await getComments(id);
            setCommentaire(response.data.filter((el)=> el.comments !== null));
        }
        fetchComments();
    },[])
    //*********************************************//
    return (
        <div className="d-flex flex-column flex-fill container980">
            <h1 className="mb20">{serieData.title}</h1>
            <div className={`card p20 mb20 d-flex flex-column flex-fill ${styles.contentCard}`}>
                <div className={`d-flex`}>
                    <div className={`${styles.imgContainer} mr20`}>
                        <img
                            src={`http://localhost:8000/series/${serieData.poster}`}
                            alt={`${serieData.title} affiche`}
                        />
                    </div>
                    <div className={`${styles.infoContainer}`}>
                        <div>
                            <h2>Résumé : </h2>
                            <p>{serieData.resume}</p>
                        </div>
                        <div>
                            <p><strong>Nombre de saison : </strong>{serieData.numberSeason}</p>
                            <p><strong>{serieData.still ? "en cours" : "arrété"}</strong></p>
                            <p><strong className={`${styles.textRed}`}>Note imdB : </strong>{serieData.imdbNote}</p>
                            <p><strong className={`${styles.textRed}`}>Note sens Critique : </strong> {serieData.sensCritiqueNote}</p>
                        </div>
                        {user && (
                            <div>
                                <div className={`${styles.noteContainer}`}>
                                    <h2>Ma note</h2>
                                    <div>
                                        {[...Array(10)].map((el,index) => {
                                            return <i 
                                                key={index} 
                                                onMouseOver={() => handleMouseEnter(index+1)} 
                                                onMouseLeave = {handleMouseLeave}
                                                onClick={() => handleClickMaNote(index+1)} 
                                                className={`
                                                    fa-solid fa-star 
                                                    ${styles.star} 
                                                    ${userLikeData && !isHover && index < userLikeData.maNote ? styles.gold : ""}
                                                    ${isHover && index < hoverRating ? styles.gold : ""}
                                                `}
                                            ></i>
                                        })}
                                    </div>
                                </div>
                                <div className={`${styles.info2Container}`}>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            name="encours" 
                                            id="enCours" 
                                            checked={
                                                userLikeData === null ? false : 
                                                userLikeData.enCours ? true : false
                                            }
                                            onChange={handleClickEnCours}
                                        />
                                        <label htmlFor="enCours">En cours</label>
                                    </div>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            name="wishList" 
                                            id="wishList"
                                            checked={
                                                userLikeData === null ? false : 
                                                userLikeData.wishList ? true : false
                                            }
                                            onChange={handleClickWishList}
                                        />
                                        <label htmlFor="wishList">Wish list</label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="mb20">Commentaire :</h2>
                    {!user ? 
                        <p><Link to="/login">Connectez-vous</Link> pour laisser un commentaire.</p> 
                    :
                        <div className="mb20">
                            <form onSubmit={handleSubmit(submit)}>
                                <div className="d-flex flex-column mb20">
                                    {userLikeData && userLikeData.comments !== null ? 
                                        <label htmlFor="comments" className="mb10">Modifier mon commentaire :</label>
                                    :
                                        <label htmlFor="comments" className="mb10">Rediger un commentaire :</label> 
                                    }
                                    <textarea 
                                        {...register("comments")} 
                                        id="comments" 
                                        className={`flex-fill ${styles.textArea}`} 
                                        rows={5}
                                        defaultValue={
                                            userLikeData && userLikeData.comments !== null ? userLikeData.comments : ""
                                        }
                                    ></textarea>
                                    {errors?.comments && (<p className={`${styles.feedback}`}>{errors.comments.message}</p>)}
                                    {feedbackGood && (<p className={`${styles.feedbackGood}`}>{feedbackGood}</p>)}
                                    {feedback && (<p className={`${styles.feedback}`}>{feedback}</p>)}
                                </div>
                                <div>
                                    <button className="btn btn-primary mr20">Soumettre</button> 
                                    <button type="button" className="btn btn-admin" onClick={deleteComments}>Supprimer</button>
                                </div>
                            </form>
                        </div>
                    }
                    <h3>Commentaire des utilisateurs :</h3>
                    <div className={`${styles.commentsSection}`}>
                        {commentaire && commentaire.map((el, index) => (
                            <div key={index} >
                                <p>{el.comments}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}