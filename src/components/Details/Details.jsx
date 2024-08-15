import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserData } from "../../Context/UserData";

export default function Details() {
    const { id, type } = useParams();
    const { getDetails } = useContext(UserData);

    const [details, setDetails] = useState();

    useEffect(() => {
        getDetails(type, id, setDetails);
    }, [getDetails, type, id]);

    function gender(type) {
        switch (type) {
            case 1:
                return "Female";

            case 2:
                return "Male";

            default:
                return "Non-binary / Not specified";
        }
    }

    return (
        <>
            {details ? (
                <div className="row my-5">
                    <div className="col-md-3">
                        <div className="box rounded-3 overflow-hidden">
                            <img src={`https://image.tmdb.org/t/p/w500${details.poster_path || details.profile_path}`} className="w-100" alt="" />
                        </div>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="box">
                            <h3>{details.title || details.name}</h3>
                            {details.tagline && <p className="my-2 fw-bold text-info fs-5">{details.tagline}</p>}

                            <div>
                                {details.overview ? (
                                    <>
                                        <span className="fw-bold fs-5 text-muted">Overview</span>
                                        <p>{details.overview}</p>
                                    </>
                                ) : (
                                    <>
                                        <span className="fw-bold fs-5 text-muted">Biography</span>
                                        <p>{details.biography.split(" ").slice(0, 50).join(" ")}</p>
                                    </>
                                )}
                            </div>
                            {details.genres && (
                                <ul className="d-flex align-items-center ps-0">
                                    <span className="fs-5 text-muted">genre </span>
                                    {details.genres.map((genre) => (
                                        <li key={genre.id} className="p-2 bg-gradient fw-bold mx-2 rounded-3">
                                            {genre.name}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {details.spoken_languages && (
                                <p className="fs-5 text-muted">
                                    spoken_languages : <span className="text-white">{details.spoken_languages[0].english_name}</span>
                                </p>
                            )}
                            <p className="fs-5 text-muted">
                                popularity : <span className="text-white">{details.popularity.toFixed(0)}</span>
                            </p>
                            {details.birthday && (
                                <p className="fs-5 text-muted">
                                    birthday : <span className="text-white">{details.birthday}</span>
                                </p>
                            )}
                            {details.place_of_birth && (
                                <p className="fs-5 text-muted">
                                    place_of_birth : <span className="text-white">{details.place_of_birth}</span>
                                </p>
                            )}

                            <p>
                                {details.release_date ? (
                                    <>
                                        <span className=" fs-5 text-muted">release_date : </span>
                                        <span className="fs-5">{details.release_date}</span>
                                    </>
                                ) : details.type ? (
                                    <>
                                        <span className=" fs-5 text-muted">Type : </span>
                                        <span className="fs-5">{details.type}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className=" fs-5 text-muted">Gender : </span>
                                        <span className="fs-5">{gender(details.gender)}</span>
                                    </>
                                )}
                            </p>

                            <p>
                                {details.vote_average !== undefined ? (
                                    <>
                                        <span className=" fs-5 text-muted">vote_average : </span>
                                        <span className="fs-5">{details.vote_average}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className=" fs-5 text-muted">Known For : </span>
                                        <span className="fs-5">{details.known_for_department}</span>
                                    </>
                                )}
                            </p>
                            {details.vote_count !== undefined && (
                                <p className="fs-5 text-muted">
                                    vote_count : <span className="text-white">{details.vote_count}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <i className="fa fa-spinner position-absolute top-50 start-50 fa-spin fs-1 "></i>
            )}
        </>
    );
}
