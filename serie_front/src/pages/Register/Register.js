import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { signup } from "../../apis/users";
import { isFileExtValid, isFileToBig } from "../../utils/utils";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const navigate = useNavigate();
  const avatarRef = useRef();
  const {user} = useContext(UserContext);

  const yupSchema = yup.object({
    pseudo: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit comporter 2 caractères")
      .max(12, "Le champ ne doit pas contenir plus de 12 caractères"),
    email: yup
      .string()
      .email("Votre email n'est pas valide")
      .required("Le champ est obligatoire"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Le champ doit comporter 5 caractères"),
    confirmPassword: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
    cgu: yup.boolean().oneOf([true], "Vous devez accepter les CGU"),
    avatar: yup
      .mixed()
      .test(
        "is-valid-type",
        "Sélectionner un type d'image valide (jpg, gif, png, jpeg, svg, webp).",
        () => isFileExtValid(avatarRef, false)
      )
      .test("is-valid-size", "Le fichier est trop volumineux (80kb max)", () =>
        isFileToBig(avatarRef, 80000, false)
      ),
  });

  const defaultValues = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
    cgu: false,
    avatar: "",
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

  async function submit() {
    setFeedback("");
    setFeedbackGood("");
    const values = getValues();

    const formData = new FormData();
    formData.append("pseudo", values.pseudo);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (avatarRef.current && avatarRef.current.files[0]) {
      formData.append("avatar", avatarRef.current.files[0]);
    }

    try {
      const response = await signup(formData);
      if (response.message) {
        setFeedback(response.message);
      } else {
        reset(defaultValues);
        setFeedbackGood(response.messageGood);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (user) {return <Navigate to="/" />}
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center flex-fill`}
    >
      <form onSubmit={handleSubmit(submit)}>
        <h3>
          Les champs <span className={`${styles.feedback}`}>*</span> sont
          obligatoire
        </h3>

        <div className="d-flex flex-column mb20">
          <label htmlFor="pseudo" className="mb10">
            Nom <span className={`${styles.feedback}`}>*</span>
          </label>
          <input {...register("pseudo")} type="text" id="pseudo" />
          {errors?.pseudo && (
            <p className={`${styles.feedback}`}>{errors.pseudo.message}</p>
          )}
        </div>

        <div className="d-flex flex-column mb20">
          <label htmlFor="email" className="mb10">
            Email <span className={`${styles.feedback}`}>*</span>
          </label>
          <input {...register("email")} type="text" id="email" />
          {errors?.email && (
            <p className={`${styles.feedback}`}>{errors.email.message}</p>
          )}
        </div>

        <div className="d-flex flex-column mb20">
          <label htmlFor="password" className="mb10">
            Password <span className={`${styles.feedback}`}>*</span>
          </label>
          <input {...register("password")} type="password" id="password" />
          {errors?.password && (
            <p className={`${styles.feedback}`}>{errors.password.message}</p>
          )}
        </div>

        <div className="d-flex flex-column mb20">
          <label htmlFor="confirmPassword" className="mb10">
            Confirm password <span className={`${styles.feedback}`}>*</span>
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
          />
          {errors?.confirmPassword && (
            <p className={`${styles.feedback}`}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="d-flex flex-column mb20">
          <label htmlFor="avatar" className="mb10">
            avatar
          </label>
          <input ref={avatarRef} type="file" id="avatar" />
          {errors?.avatar && (
            <p className={`${styles.feedback}`}>{errors.avatar.message}</p>
          )}
        </div>

        <div className="d-flex mb20 align-items-center">
          <label htmlFor="cgu" className="mr10">
            CGU <span className={`${styles.feedback}`}>*</span>
          </label>
          <input {...register("cgu")} type="checkbox" id="cgu" />
        </div>
        {errors?.cgu && (
          <p className={`${styles.feedback}`}>{errors.cgu.message}</p>
        )}

        <button className="btn btn-primary">Submit</button>
        {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>
        )}
      </form>
    </div>
  );
}
