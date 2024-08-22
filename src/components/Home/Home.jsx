import React, { useContext, useEffect, useState } from "react";
import Item from "../Item/Item";
import { UserData } from "../../Context/UserData";

export default function Home() {
    const { getTrendingData, userData } = useContext(UserData);
    const [moviesData, setMoviesData] = useState("");
    const [tvsData, setTvsData] = useState("");
    const [peopleData, setPeopleData] = useState("");

    useEffect(() => {
        getTrendingData("movie", setMoviesData);
        getTrendingData("tv", setTvsData);
        getTrendingData("person", setPeopleData);
    }, [getTrendingData]);

    const renderSection = (title, description, data) => (
        <div className="row">
            <div className="col-md-4">
                <div className="content h-100 d-flex flex-column justify-content-center">
                    <h2 className="position-relative">
                        Trending <br /> {title} <br /> To watch now
                    </h2>
                    <p className="text-muted mt-2">{description}</p>
                </div>
            </div>
            {data.slice(0, 10).map((item) => (
                <Item key={item.id} data={item} />
            ))}
        </div>
    );

    return (
        <>
            {tvsData && moviesData && peopleData ? (
                <>
                    <h3 className="my-4 text-muted">
                        Welcome <span className="fw-bold text-white text-decoration-underline text-uppercase"> {userData.name}</span>
                    </h3>
                    <div className="my-4">
                        {moviesData && renderSection("Movies", "Most watched movies by day", moviesData)}

                        {tvsData && renderSection("TV", "Most watched TV shows by day", tvsData)}

                        {peopleData && renderSection("Person", "Most popular persons by day", peopleData)}
                    </div>
                </>
            ) : (
                <i className="fa fa-spinner position-absolute top-50 start-50 fa-spin fs-1 "></i>
            )}
        </>
    );
}
