import axios from "axios";
import Joi from "joi";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [validateErrors, setValidateErrors] = useState([]);
    const [APiErrors, setAPiErrors] = useState(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const schema = Joi.object({
        password: Joi.string().pattern(new RegExp("^[A-Z][a-z]{5,10}$")).required().messages({
            "string.pattern.base": "must be first letter is uppercase and at lest 6 characters small and the length less than 10 characters",
        }),
    });

    function validateUser() {
        let { error } = schema.validate({ password });

        if (error) {
            setValidateErrors(error.details);
            return false;
        } else {
            setValidateErrors(["done"]);
            return true;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (validateUser()) {
            setIsLoading(true);
            try {
                const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
                    email: localStorage.getItem("email"),
                    newPassword: password,
                });
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
            <div className="w-50 m-auto py-5 mb-5">
                <h2 className="mb-5">Reset Password</h2>
                <p className="text-center text-muted mb-3"> We have verified your code. Please enter a new password.</p>

                {APiErrors && <div className="alert alert-danger">{APiErrors}</div>}

                <form onSubmit={(e) => handleSubmit(e)}>
                    {/* <div className="input-data my-2">
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
                    </div> */}

                    <div className="alert alert-secondary fw-bold h5">{localStorage.getItem("email")}</div>

                    <div className="input-data my-2 ">
                        <label htmlFor="password">NewPassword</label>
                        <div className="d-flex align-items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
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

                    <button className={`btn btn-info d-block ms-auto `}>{IsLoading ? <i className="fa fa-spinner fa-spin"></i> : "Rest Password"}</button>
                </form>
            </div>
        </>
    );
}
