import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../../Context/UserData";
import Scroll from "../Scroll/Scroll";
import Options from "../Options/Options";
import styles from "./Home.module.scss";
import Video from "../Video/Video";

export default function Home() {
    const { fetchData, userData } = useContext(UserData);
    const [trendingData, setTrendingData] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [popular, setPopular] = useState(null);
    const [free, setFree] = useState(null);

    const optionsConfig = {
        trending: [
            { label: "Today", value: "day", endPoint: "trending/all/day" },
            { label: "This Week", value: "week", endPoint: "trending/all/week" },
        ],
        trailers: [
            { label: "Popular", value: "popular" },
            { label: "Streaming", value: "now_playing" },
            { label: "On Tv", value: "on_the_air" },
            { label: "For Rent", value: "airing_today" },
            { label: "In Theaters", value: "upcoming" },
        ],
        popular: [
            { label: "Streaming", value: "now_playing", endPoint: "movie/now_playing" },
            { label: "On Tv", value: "on_the_air", endPoint: "tv/on_the_air" },
            { label: "For Rent", value: "airing_today", endPoint: "tv/airing_today" },
            { label: "In Theaters", value: "upcoming", endPoint: "movie/upcoming" },
        ],

        free: [
            { label: "Movies", value: "movie", endPoint: "discover/movie", parameter: { watch_region: "US", with_watch_monetization_types: "free" } },
            { label: "TV", value: "tv", endPoint: "discover/tv", parameter: { watch_region: "US", with_watch_monetization_types: "free" } },
        ],
    };

    const [values, setValues] = useState([
        { category: "trending", value: "day", endPoint: "trending/all/day" },
        { category: "trailers", value: "popular" },
        { category: "popular", value: "now_playing", endPoint: "movie/now_playing" },
        { category: "free", value: "movie", endPoint: "discover/movie", parameter: { watch_region: "US", with_watch_monetization_types: "free" } },
    ]);

    const data = async (endpoint, parameter, setter) => {
        try {
            const responseData = await fetchData(endpoint, parameter);
            setter(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        console.log("from trending");

        if (values[0].value) {
            data(values[0].endPoint, {}, setTrendingData);
        }
    }, [values[0].value]);

    useEffect(() => {
        console.log("from popular");

        if (values[2].value) {
            data(values[2].endPoint, {}, setPopular);
        }
    }, [values[2].value]);

    useEffect(() => {
        console.log("from Free to Watch");

        if (values[3].value) {
            data(values[3].endPoint, values[3].parameter, setFree);
        }
    }, [values[3].value]);

    console.log(trendingData);

    return (
        <>
            {trendingData && trailers && popular ? (
                <>
                    <h3 className="text-muted my-3">
                        Welcome <span className="fw-bold text-white text-decoration-underline text-uppercase">{userData?.name}</span>
                    </h3>
                    <div className={`${styles.search} input-group bg-gradient`}>
                        <input
                            type="text"
                            className="form-control bg-transparent text-white"
                            placeholder="Search for Movies, TV Shows, People..."
                            aria-label="Search"
                            aria-describedby="button-addon2"
                        />
                        <button className="btn btn-gradient text-white" type="button" id="button-addon2">
                            <span className="fw-bold">Search</span> <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    {/* Options for Trending, Trailers, and What's Popular */}
                    <Options options={optionsConfig.trending} setValue={setValues} value={values[0]} title="Trending" />
                    {trendingData.results && <Scroll data={trendingData.results} />}

                    <Options options={optionsConfig.popular} setValue={setValues} value={values[2]} title="What's Popular" />
                    {popular.results && <Scroll data={popular.results} />}

                    <Options options={optionsConfig.free} setValue={setValues} value={values[3]} title="Free To Watch" />
                    {free.results && <Scroll data={free.results} />}

                    {/* Scroll and Video Components (conditionally rendered) */}
                    {/* Video components could be placed here if needed */}
                </>
            ) : (
                <i className="fa fa-spinner position-absolute top-50 start-50 fa-spin fs-1"></i>
            )}
        </>
    );
}
