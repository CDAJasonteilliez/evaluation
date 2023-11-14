import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  if (!user) {return <Navigate to="/" />}
  return (
    <>
      <h1>Profile</h1>
    </>
  );
}
