import axios from "axios";
import Joi from "joi";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../Context/UserData";

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [validateErrors, setValidateErrors] = useState([]);
    const [APiErrors, setAPiErrors] = useState(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { handleUserData } = useContext(UserData);
    const navigate = useNavigate();

    const getUserData = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string().pattern(new RegExp("^[A-Z][a-z]{5,10}$")).required().messages({
            "string.pattern.base": "must be first letter is uppercase and at lest 6 characters small and the length less than 10 characters",
        }),
    });

    function validateUser() {
        let validationData = schema.validate(user, { abortEarly: false });

        if (validationData) {
            if (validationData.error) {
                setValidateErrors(validationData.error.details);
                return false;
            } else {
                setValidateErrors(["done"]);
                return true;
            }
        }
    }

    async function loginFormData(e) {
        e.preventDefault();

        handleRememberMe();
        if (validateUser()) {
            setIsLoading(true);
            try {
                const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", user);
                localStorage.setItem("token", data.token);
                handleUserData();
                navigate("/");
                setAPiErrors(null);
                setIsLoading(false);
            } catch ({ response }) {
                setIsLoading(false);
                setAPiErrors(response.data.message);
            }
        }
    }

    function handleRememberMe() {
        if (rememberMe) {
            localStorage.setItem("email", user.email);
            localStorage.setItem("remember", rememberMe);
        } else {
            localStorage.removeItem("email", user.email);
            localStorage.removeItem("remember", rememberMe);
        }
    }

    useEffect(() => {
        const email = localStorage.getItem("email");
        const remember = localStorage.getItem("remember") === "true";
        if (email && remember) {
            user.email = email;
            setRememberMe(remember);
        }
    }, []);

    return (
        <>
            <div className="m-auto mt-5 authContent">
                <h2 className="mb-5">Login Form</h2>

                {APiErrors && <div className="alert alert-danger">{APiErrors}</div>}

                <form onSubmit={(e) => loginFormData(e)}>
                    <div className="input-data my-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => getUserData(e)}
                            className={`form-control my-2 ${
                                validateErrors.length !== 0 && (validateErrors.find((e) => e.context?.label === "email") ? "is-invalid" : validateErrors[0] === "done" ? "is-valid" : "is-valid")
                            }`}
                            name="email"
                            value={user.email}
                        />
                        {validateErrors.find((e) => e.context?.label === "email") && <div className="alert alert-danger ">{validateErrors.find((e) => e.context?.label === "email").message}</div>}
                    </div>
                    <div className="input-data my-2 ">
                        <div className="d-flex justify-content-between align-items-center my-3">
                            <label htmlFor="password">Password</label>
                            <Link className="mb-0 text-muted" to={"/forgetPassword"}>
                                Forget?
                            </Link>
                        </div>
                        <div className="d-flex align-items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                onChange={(e) => getUserData(e)}
                                className={`form-control my-2 ${
                                    validateErrors.length !== 0 && (validateErrors.find((e) => e.context?.label === "password") ? "is-invalid" : validateErrors[0] === "done" ? "is-valid" : "is-valid")
                                }`}
                                name="password"
                            />

                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-outline-secondary ms-3">
                                {showPassword ? <i className="fa-solid fa-eye fs-4 "></i> : <i className="fa-solid fa-eye-slash fs-4 "></i>}
                            </button>
                        </div>
                        {validateErrors.find((e) => e.context?.label === "password") && <div className="alert alert-danger">{validateErrors.find((e) => e.context?.label === "password").message}</div>}
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="text-muted mb-0">
                            Don't have an account ?
                            <Link className="text-muted" to={"/register"}>
                                Register
                            </Link>
                        </p>
                        <button className={`btn btn-info `}>{IsLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}
