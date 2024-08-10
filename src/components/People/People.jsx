import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../../Context/UserData";
import Item from "../Item/Item";

export default function People() {
    const [peopleData, setPeopleData] = useState("");
    const { getData } = useContext(UserData);

    useEffect(() => {
        getData("person", setPeopleData);
    }, []);
    return (
        <>
            {peopleData ? (
                <div className="row py-5">
                    {peopleData.map((item) => (
                        <Item data={item} />
                    ))}
                </div>
            ) : (
                <i className="fa fa-spinner position-absolute top-50 start-50 fa-spin fs-1 "></i>
            )}
        </>
    );
}
