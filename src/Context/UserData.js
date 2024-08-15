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

    async function getData(mediaType, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=62ead689c7ce69ca894c11b092df4192`);
        callback(data.results);
    }

    async function getDetails(mediaType, id, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=62ead689c7ce69ca894c11b092df4192&append_to_response=videos,images`);
        callback(data);
    }

    return <UserData.Provider value={{ userData, setUserData, handleUserData, getData, getDetails }}>{props.children}</UserData.Provider>;
}

export default UserDataProvider;
