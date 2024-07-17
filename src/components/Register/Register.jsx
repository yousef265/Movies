import React, { useState } from "react";
import axios from "axios";
import joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        age: "",
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [errorsList, setErrorsList] = useState([]);

    let navigate = useNavigate();

    let submitFormData = async (e) => {
        e.preventDefault();
        let validationResponse = validateFormData();
        if (validationResponse.error) {
            setErrorsList(validationResponse.error.details);
        } else {
            let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signup", user);
            if (data.message === "success") {
                goToLogin();
            } else {
                setErrorMsg(data.message);
            }
        }
    };

    let validateFormData = () => {
        const schema = joi.object({
            first_name: joi.string().alphanum().required().min(2).max(10),
            last_name: joi.string().alphanum().required().min(2).max(10),
            age: joi.number().required().min(20).max(80),
            email: joi
                .string()
                .required()
                .email({ tlds: { allow: ["com", "net"] } }),
            password: joi
                .string()
                .required()
                .pattern(new RegExp(/^[a-z][0-9]{3}$/)),
        });
        return schema.validate(user, { abortEarly: false });
    };

    let goToLogin = () => {
        navigate("/login");
    };

    let getInputValue = (e) => {
        let myUser = { ...user }; //1  deep copy
        myUser[e.target.name] = e.target.value; //nadia
        setUser(myUser);
    };

    return (
        <>
            <div className="w-75 m-auto py-5">
                <h2>Registeration Form</h2>
                {errorsList.map((error, index) => (
                    <div key={index} className="alert alert-danger p-2">
                        {error.message}
                    </div>
                ))}

                {errorMsg ? <div className="alert alert-danger p-2">{errorMsg}</div> : ""}
                <form onSubmit={submitFormData}>
                    <div className="input-data my-2">
                        <label htmlFor="first_name">First Name</label>
                        <input onChange={getInputValue} type="text" className="form-control my-2" name="first_name" />
                    </div>
                    <div className="input-data my-2">
                        <label htmlFor="last_name">Last Name</label>
                        <input onChange={getInputValue} type="text" className="form-control my-2" name="last_name" />
                    </div>
                    <div className="input-data my-2">
                        <label htmlFor="age">Age</label>
                        <input onChange={getInputValue} type="number" className="form-control my-2" name="age" />
                    </div>
                    <div className="input-data my-2">
                        <label htmlFor="email">Email</label>
                        <input onChange={getInputValue} type="email" className="form-control my-2" name="email" />
                    </div>
                    <div className="input-data my-2">
                        <label htmlFor="password">Password</label>
                        <input onChange={getInputValue} type="password" className="form-control my-2" name="password" />
                    </div>

                    <button className="btn btn-info my-3 float-end">register</button>
                    <div className="clear-fix"></div>
                </form>
            </div>
        </>
    );
}
