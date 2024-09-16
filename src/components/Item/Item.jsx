import React from "react";
import { Link } from "react-router-dom";
import no_picture from "../../assets/images/no_picture.svg";
import styles from "./Item.module.scss";

export default function Item({ data, media_type }) {
    if (!data) return null; // Ensure no rendering if no data

    const imageSrc = data.poster_path || data.profile_path ? `https://image.tmdb.org/t/p/w500${data.poster_path || data.profile_path}` : no_picture;
    const votePercentage = (data.vote_average * 10).toFixed(0);

    return (
        <div className={styles.item}>
            <div className={styles.img_content}>
                <Link className={`nav-link ${styles.item}`} to={`/${media_type}/${data.id}`}>
                    <div className="overflow-hidden position-relative">
                        <img src={imageSrc} alt={data.name || data.title || "Image not available"} />

                        {/* Progress Circle */}
                        <div className={styles.flexWrapper}>
                            <div className={styles.singleChart}>
                                <svg viewBox="0 0 36 36" className={`${styles.circularChart} ${styles.light}`}>
                                    <path
                                        className={styles.circleBg}
                                        d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className={styles.circle}
                                        strokeDasharray={`${votePercentage}, 100`}
                                        d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" className={styles.percentage}>
                                        {votePercentage}%
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h6 className="my-2 fw-bold ">{data.name || data.title}</h6>
                </Link>
                {/* Dropdown menu button */}
                <div className={styles.menu}>
                    <button className={styles.dropdown} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Menu">
                        <i className="fa-solid fa-ellipsis fa-lg p-2 "></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <button className="dropdown-item" type="button">
                                <i className="fa-solid fa-heart fa-3 me-2"></i>
                                <span>Favorite</span>
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" type="button">
                                <i className="fa-solid fa-bookmark fa-3 me-2"></i>
                                <span>Watch List</span>
                            </button>
                        </li>

                        <li>
                            <button className="dropdown-item" type="button">
                                <i className="fa-solid fa-star fa-3 me-2"></i>
                                <span>Your Rating</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Title and Release Date */}
            <p className="text-muted fw-bold">{data.release_date || data.first_air_date || "Release date not available"}</p>
        </div>
    );
}
