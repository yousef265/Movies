import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <div className="menu bg-dark p-2 rounded ">
                <ul className="navbar-nav mb-lg-0 menuContent">
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link active-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Movies
                        </NavLink>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <NavLink className="dropdown-item" to={"/movies/popular"}>
                                    Popular
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"/movies/now_playing"}>
                                    Now Playing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"/movies/top_rated"}>
                                    Top Rated
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="dropdown-item" to={"/movies/upcoming"}>
                                    UpComing
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link active-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Tv Shows
                        </NavLink>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/popular"}>
                                    Popular
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/airing_today"}>
                                    Airing Today
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/on_the_air"}>
                                    On TV
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/top_rated"}>
                                    Top Rated
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link active-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Tv Shows
                        </NavLink>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/popular"}>
                                    Popular
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/airing_today"}>
                                    Airing Today
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/on_the_air"}>
                                    On TV
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/top_rated"}>
                                    Top Rated
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link active-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Tv Shows
                        </NavLink>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/popular"}>
                                    Popular
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/airing_today"}>
                                    Airing Today
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/on_the_air"}>
                                    On TV
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"/tvShows/top_rated"}>
                                    Top Rated
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
}
