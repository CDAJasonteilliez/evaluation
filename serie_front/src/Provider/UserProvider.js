import { useState } from "react";
import { UserContext } from "../context/UserContext";
import { useLoaderData } from "react-router-dom";

export default function UserProvider({children}) {
    const { userLoad } = useLoaderData()
    const [user, setUser] = useState(userLoad);

    return (
        <UserContext.Provider 
            value={{
                user, 
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}