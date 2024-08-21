import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserData = createContext();

function UserDataProvider(props) {
    const [userData, setUserData] = useState(null);

    function handleUserData() {
        const token = localStorage.getItem("token");
        const decodedData = jwtDecode(token);
        setUserData(decodedData);
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            handleUserData();
        }
    }, []);

    async function getTrendingData(mediaType, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=62ead689c7ce69ca894c11b092df4192`);
        callback(data.results);
    }

    async function getDetails(mediaType, id, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=62ead689c7ce69ca894c11b092df4192&append_to_response=videos,images`);
        callback(data);
    }

    async function getDiffMediaTypeData(mediaType, title, callback, page) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${title}?api_key=62ead689c7ce69ca894c11b092df4192&language=en-US&page=${page}`);
        callback(data);
    }

    async function getSearchData(mediaType, searchValue, page, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/search/${mediaType}?api_key=62ead689c7ce69ca894c11b092df4192&query=${searchValue}&page=${page}`);
        callback(data);
    }

    return <UserData.Provider value={{ userData, setUserData, handleUserData, getTrendingData, getDetails, getDiffMediaTypeData, getSearchData }}>{props.children}</UserData.Provider>;
}

export default UserDataProvider;
