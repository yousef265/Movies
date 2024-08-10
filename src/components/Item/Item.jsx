import React from "react";

export default function Item({ data }) {
    return (
        data && (
            <div className="col-md-2 col-sm-4">
                <div className="item position-relative overflow-hidden rounded">
                    <img className="w-100" src={`https://image.tmdb.org/t/p/w500${data.poster_path || data.profile_path}`} alt={data.name || data.title} />
                    {data.overview && <div className="layer ">{data.overview.split(" ").slice(0, 15).join(" ")}</div>}
                    {data.vote_average || data.vote_average === 0 ? (
                        <span className="vote bg-info p-1 fw-bold">vote:{data.vote_average.toFixed(1)}</span>
                    ) : (
                        <span className="vote bg-info p-1 fw-bold">popularity: {data.popularity.toFixed(0)}</span>
                    )}
                </div>
                <h6 className="text-danger text-center">{data.name || data.title}</h6>
            </div>
        )
    );
}
