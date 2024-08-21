import React from "react";
import { Link } from "react-router-dom";

export default function Item({ data, media_type }) {
    return (
        data && (
            <div className="col-md-2 col-sm-4">
                <Link to={`/details/${data.id}/${data.media_type || media_type}`} className="item nav-link   ">
                    <div className="position-relative  overflow-hidden rounded ">
                        <img className="w-100" src={`https://image.tmdb.org/t/p/w500${data.poster_path || data.profile_path}`} alt={data.name || data.title} />
                        {data.overview && (
                            <div to={"/details"} className="layer ">
                                {data.overview.split(" ").slice(0, 10).join(" ")}
                            </div>
                        )}
                        {data.vote_average !== undefined ? (
                            <span className="vote bg-info p-1 fw-bold">vote:{data.vote_average?.toFixed(1)}</span>
                        ) : (
                            <span className="vote bg-info p-1 fw-bold">popularity: {data.popularity?.toFixed(0)}</span>
                        )}
                    </div>
                    <h6 className="text-white bg-gradient py-2 text-center">{data.name || data.title}</h6>
                </Link>
            </div>
        )
    );
}
