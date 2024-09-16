import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { UserData } from "../../Context/UserData";

export default function Navbar() {
    const { userData, setUserData } = useContext(UserData);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        setUserData(null);
        navigate("/login");
    }

    return (
        <nav className={`navbar navbar-expand-lg ${styles.editNavbar}  py-3`}>
            <div className="container">
                <NavLink className="navbar-brand" to="">
                    Noxe
                </NavLink>
                <button
                    className="navbar-toggler bg-gradient"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {userData && (
                        <ul className="navbar-nav  mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active-link" to="">
                                    Home
                                </NavLink>
                            </li>

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

                            <li className="nav-item">
                                <NavLink className="nav-link active-link" to="people">
                                    People
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active-link" to="about">
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    )}

                    <ul className="navbar-nav  ms-auto mb-lg-0">
                        {userData ? (
                            <li className="nav-item ms-0 ps-0">
                                <span className="logout" onClick={handleLogout}>
                                    Logout
                                </span>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active-link" to="login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active-link" to="register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
