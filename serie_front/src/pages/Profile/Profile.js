import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <h1>Profile</h1>
    </>
  );
}
