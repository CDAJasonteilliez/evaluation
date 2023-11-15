import { useContext, useState } from "react";
import { SeriesContext } from "../../../../context/SeriesContext";
import { UserContext } from "../../../../context/UserContext";
import SerieWishlist from "./Components/SerieWishlist/SerieWishlist";
import { changeWishList } from "../../../../apis/likes";

export default function Wishlist() {
    const { user, setUser } = useContext(UserContext);
    const {series} = useContext(SeriesContext);
    const [key, setKey] = useState(0);

    
    const retirerWishlist = async(id) => {
        const values = {
            idUser: user.idUser,
            idSerie: id,
            wishList: 0,
        }
        const response = await changeWishList(values);
        if (response.messageGood){
            const newUser = user;
            const likeID = user.likes.findIndex((el) => el.idSerie === id);
            newUser.likes[likeID].wishList = 0;
            setUser(newUser);
            setKey((curr) => curr + 1);
        }
    }

    return (
        <>
            <h1 className="mb20">Ma wishlist</h1>
            {user.likes
                .filter((el) => el.wishList === 1)
                .map((el) => 
                    <SerieWishlist 
                        key={el.idSerie} 
                        serie={series.filter((serie) => serie.idSerie === el.idSerie)[0]}
                        retirerWishlist={retirerWishlist}
                    />
                )
            }
        </>
    )
}