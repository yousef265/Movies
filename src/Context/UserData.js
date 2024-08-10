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
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
        callback(data.results);
    }

    return <UserData.Provider value={{ userData, setUserData, handleUserData, getData }}>{props.children}</UserData.Provider>;
}

export default UserDataProvider;
