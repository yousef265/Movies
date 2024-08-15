import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../../Context/UserData";
import Item from "../Item/Item";

export default function Movies() {
    const { getData } = useContext(UserData);
    const [moviesData, setMoviesData] = useState("");

    useEffect(() => {
        getData("movie", setMoviesData);
    }, [getData]);

    return (
        <>
            {moviesData ? (
                <div className="row py-5">
                    {moviesData.map((item) => (
                        <Item data={item} key={item.id} />
                    ))}
                </div>
            ) : (
                <i className="fa fa-spinner position-absolute top-50 start-50 fa-spin fs-1 "></i>
            )}
        </>
    );
}
