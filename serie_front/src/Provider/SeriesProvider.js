import { useState } from "react";
import { SeriesContext } from "../context/SeriesContext";
import { useLoaderData } from "react-router-dom";

export default function SeriesProvider({children}) {
    const { serieLoad } = useLoaderData()
    const [series, setSeries] = useState(serieLoad);

    return (
        <SeriesContext.Provider 
            value={{
                series, 
                setSeries
            }}
        >
            {children}
        </SeriesContext.Provider>
    )
}