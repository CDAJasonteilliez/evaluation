import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import styles from "../Register/Register.module.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { signin } from "../../apis/users";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const yupSchema = yup.object({
    email: yup.string().required("Le champ est obligatoire"),
    password: yup.string().required("Le champ est obligatoire"),
  });

  const defaultValues = {
    email: "",
    password: "",
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
    try {
      const response = await signin(values);
      if (response.message) {
        setFeedback(response.message);
      } else {
        reset(defaultValues);
        setFeedbackGood(response.messageGood);
        setUser({
          idUser: response.idUser,
          admin: response.admin,
          pseudo: response.pseudo,
          email: response.email,
          avatar: response.avatar,
          likes: response.likes,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
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
        <div className="d-flex flex-column mb20">
          <label htmlFor="email" className="mb10">
            Email
          </label>
          <input {...register("email")} type="text" id="email" />
          {errors?.email && (
            <p className="text-error">{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="password" className="mb10">
            Password
          </label>
          <input {...register("password")} type="password" id="password" />
          {errors?.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <button className="btn btn-primary">Submit</button>
        {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>
        )}
      </form>
    </div>
  );
}
