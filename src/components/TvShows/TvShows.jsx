import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../../Context/UserData";
import Item from "../Item/Item";

export default function TvShows() {
    const [tvData, setTvData] = useState("");
    const { getData } = useContext(UserData);

    useEffect(() => {
        getData("tv", setTvData);
    }, [getData]);

    return (
        <>
            {tvData ? (
                <div className="row py-5">
                    {tvData.map((item) => (
                        <Item data={item} key={item.id} />
                    ))}
                </div>
            ) : (
                <i className="fa fa-spinner position-absolute top-50 start-50 fa-spin fs-1 "></i>
            )}
        </>
    );
}
