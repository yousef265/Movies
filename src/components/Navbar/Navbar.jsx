import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <nav className={`navbar navbar-expand-lg ${styles.bgNavbar} py-3`}>
            <div className="container">
                <Link className="navbar-brand" to="">
                    Noxe
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {userData && (
                        <ul className="navbar-nav  mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Movies
                                </Link>
                                <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to={"/movies/popular"}>
                                            Popular
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={"/movies/now_playing"}>
                                            Now Playing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={"/movies/top_rated"}>
                                            Top Rated
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to={"/movies/upcoming"}>
                                            UpComing
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tv Shows
                                </Link>
                                <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to={"/tvShows/popular"}>
                                            Popular
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={"/tvShows/airing_today"}>
                                            Airing Today
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to={"/tvShows/on_the_air"}>
                                            On TV
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={"/tvShows/top_rated"}>
                                            Top Rated
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="people">
                                    People
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="about">
                                    About
                                </Link>
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
                                    <Link className="nav-link" to="login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="register">
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
