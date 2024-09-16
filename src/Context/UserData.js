import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserData = createContext();

function UserDataProvider(props) {
    const [userData, setUserData] = useState(null);
    const baseUrl = "https://api.themoviedb.org/3/";
    const api_key = "62ead689c7ce69ca894c11b092df4192";

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

    const fetchData = async (endPoint, params = {}) => {
        try {
            const { data } = await axios.get(`${baseUrl}${endPoint}`, {
                params: {
                    api_key,
                    ...params,
                },
            });
            return data;
        } catch (error) {
            console.error("Error Fetching Data:", error);
        }
    };

    // const getTrailers = async () => {

    // };

    // async function getTrendingData(endPoint, dataContainer) {
    //     await fetchData(endPoint, {}, dataContainer);
    // }

    // // These Function Will Be Updating

    // async function getDetails(mediaType, id, callback) {
    //     let { data } = await axios.get(`${baseUrl}${mediaType}/${id}?api_key=${api_key}&append_to_response=videos,images`);
    //     callback(data);
    // }

    // async function getDiffMediaTypeData(mediaType, title, callback, page) {
    //     let { data } = await axios.get(`${baseUrl}${mediaType}/${title}?api_key=${api_key}&language=en-US&page=${page}`);
    //     callback(data);
    // }

    // async function getSearchData(mediaType, searchValue, page, callback) {
    //     let { data } = await axios.get(`${baseUrl}search/${mediaType}?api_key=${api_key}&query=${searchValue}&page=${page}`);
    //     callback(data);
    // }

    return <UserData.Provider value={{ userData, setUserData, handleUserData, fetchData }}>{props.children}</UserData.Provider>;
}

export default UserDataProvider;
