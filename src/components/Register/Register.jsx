import axios from "axios";
import Joi from "joi";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
    });
    const [validateErrors, setValidateErrors] = useState([]);
    const [APiErrors, setAPiErrors] = useState(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const getUserData = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const schema = Joi.object({
        name: Joi.string()
            .pattern(/^[a-zA-Z ]+$/)
            .trim()
            .required()
            .messages({
                "string.empty": "Name is required",
                "string.pattern.base": "Name can only contain alphabetic characters and spaces",
                "any.required": "Name is required",
            }),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string().pattern(new RegExp("^[A-Z][a-z]{5,10}$")).required().messages({
            "string.pattern.base": "must be first letter is uppercase and at lest 6 characters small and the length less than 10 characters",
        }),
        rePassword: Joi.any().valid(Joi.ref("password")).required().messages({
            "any.only": "Passwords do not match",
        }),
        phone: Joi.string()
            .pattern(/^01[0-9]{9}$/)
            .required()
            .messages({
                "string.pattern.base": "Phone number must be a valid Egyptian mobile number starting with 01 and followed by 9 digits.",
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

    async function registerFormData(e) {
        e.preventDefault();

        if (validateUser()) {
            setIsLoading(true);
            try {
                const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", user);
                navigate("/login");
                setAPiErrors(null);
                setIsLoading(false);
            } catch ({ response }) {
                setIsLoading(false);
                setAPiErrors(response.data.message);
            }
        }
    }

    return (
        <>
            <div className="m-auto mt-5 authContent">
                <h2 className="mb-5">Register Form</h2>

                {APiErrors && <div className="alert alert-danger">{APiErrors}</div>}

                <form onSubmit={(e) => registerFormData(e)}>
                    <div className="input-data my-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => getUserData(e)}
                            className={`form-control my-2 ${
                                validateErrors.length !== 0 && (validateErrors.find((e) => e.context?.label === "name") ? "is-invalid" : validateErrors[0] === "done" ? "is-valid" : "is-valid")
                            }`}
                            name="name"
                        />
                        {validateErrors.find((e) => e.context?.label === "name") && <div className="alert alert-danger">{validateErrors.find((e) => e.context?.label === "name").message}</div>}
                    </div>

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
                        />
                        {validateErrors.find((e) => e.context?.label === "email") && <div className="alert alert-danger ">{validateErrors.find((e) => e.context?.label === "email").message}</div>}
                    </div>
                    <div className="input-data my-2 ">
                        <label htmlFor="password">Password</label>
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
                    <div className="input-data my-2 ">
                        <label htmlFor="rePassword">RePassword</label>
                        <div className="d-flex align-items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="rePassword"
                                onChange={(e) => getUserData(e)}
                                className={`form-control my-2 ${
                                    validateErrors.length !== 0 &&
                                    (validateErrors.find((e) => e.context?.label === "rePassword") ? "is-invalid" : validateErrors[0] === "done" ? "is-valid" : "is-valid")
                                }`}
                                name="rePassword"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-outline-secondary ms-3">
                                {showPassword ? <i className="fa-solid fa-eye fs-4 "></i> : <i className="fa-solid fa-eye-slash fs-4 "></i>}
                            </button>
                        </div>
                        {validateErrors.find((e) => e.context?.label === "rePassword") && (
                            <div className="alert alert-danger">{validateErrors.find((e) => e.context?.label === "rePassword").message}</div>
                        )}
                    </div>

                    <div className="input-data my-2">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            onChange={(e) => getUserData(e)}
                            className={`form-control my-2 ${
                                validateErrors.length !== 0 && (validateErrors.find((e) => e.context?.label === "phone") ? "is-invalid" : validateErrors[0] === "done" ? "is-valid" : "is-valid")
                            }`}
                            name="phone"
                        />
                        {validateErrors.find((e) => e.context?.label === "phone") && <div className="alert alert-danger">{validateErrors.find((e) => e.context?.label === "phone").message}</div>}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="text-muted mb-0 ">
                            Already have an account ?
                            <Link className="text-muted" to={"/login"}>
                                Login
                            </Link>
                        </p>
                        <button className={`btn btn-info `}>{IsLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}
