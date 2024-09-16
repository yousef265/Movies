import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserData } from "../../Context/UserData";
import Menu from "../Menu/Menu";

export default function Details() {
    const { id, type } = useParams();
    const { getDetails } = useContext(UserData);

    const [details, setDetails] = useState();

    // useEffect(() => {
    //     getDetails(type, id, setDetails);
    // }, [getDetails, type, id]);

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
            <h2>Details</h2>
            {/* {details ? (
                <>
                    <Menu />

                    <div
                        className="backgroundImage rounded overflow-hidden my-4"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500${details.backdrop_path || details.profile_path})`,
                        }}
                    >
                        <div className="row details">
                            <div className="col-md-3">
                                <div className="box rounded-3 overflow-hidden">
                                    <img src={`https://image.tmdb.org/t/p/w500${details.poster_path || details.profile_path}`} className="w-100" alt={details.title || details.name} />
                                </div>
                            </div>
                            <div className="col-md-9 ">
                                <div className="box text-break">
                                    <h3>{details.title || details.name}</h3>
                                    {details.tagline && <p className="my-2 fw-bold text-muted fs-5">{details.tagline}</p>}

                                    {details.overview ? (
                                        <div>
                                            <span className="fw-bold fs-5 ">Overview</span>
                                            <p>{details.overview.split(" ").slice(0, 50).join(" ")}</p>
                                        </div>
                                    ) : details.biography ? (
                                        <div>
                                            <span className="fw-bold fs-5 ">Biography</span>
                                            <p>{details.biography.split(" ").slice(0, 50).join(" ")}</p>
                                        </div>
                                    ) : null}

                                    {details.genres && (
                                        <ul className="d-flex align-items-center flex-wrap ps-0 mt-3">
                                            <span className="fs-5 ">genre </span>
                                            {details.genres.map((genre) => (
                                                <li key={genre.id} className="p-2 bg-gradient fw-bold mx-2 rounded-3">
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {details.spoken_languages && (
                                        <p className="fs-5 ">
                                            spoken_languages : <span className="text-white">{details.spoken_languages[0].english_name}</span>
                                        </p>
                                    )}
                                    <p className="fs-5 ">
                                        popularity : <span className="text-white">{details.popularity.toFixed(0)}</span>
                                    </p>
                                    {details.birthday && (
                                        <p className="fs-5 ">
                                            birthday : <span className="text-white">{details.birthday}</span>
                                        </p>
                                    )}
                                    {details.place_of_birth && (
                                        <p className="fs-5 ">
                                            place_of_birth : <span className="text-white">{details.place_of_birth}</span>
                                        </p>
                                    )}

                                    <p>
                                        {details.release_date ? (
                                            <>
                                                <span className=" fs-5 ">release_date : </span>
                                                <span className="fs-5">{details.release_date}</span>
                                            </>
                                        ) : details.type ? (
                                            <>
                                                <span className=" fs-5 ">Type : </span>
                                                <span className="fs-5">{details.type}</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className=" fs-5 ">Gender : </span>
                                                <span className="fs-5">{gender(details.gender)}</span>
                                            </>
                                        )}
                                    </p>

                                    <p>
                                        {details.vote_average !== undefined ? (
                                            <>
                                                <span className=" fs-5 ">vote_average : </span>
                                                <span className="fs-5">{details.vote_average.toFixed(1)}</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className=" fs-5 ">Known For : </span>
                                                <span className="fs-5">{details.known_for_department}</span>
                                            </>
                                        )}
                                    </p>
                                    {details.vote_count !== undefined && (
                                        <p className="fs-5 ">
                                            vote_count : <span className="text-white">{details.vote_count}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>content</div>
                </>
            ) : (
                <i className="fa fa-spinner position-absolute top-50 start-50 fa-spin fs-1 "></i>
            )} */}
        </>
    );
}
