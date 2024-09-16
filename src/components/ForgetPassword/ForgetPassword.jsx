import axios from "axios";
import Joi from "joi";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [validateErrors, setValidateErrors] = useState([]);
    const [APiErrors, setAPiErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    });

    function validateUserEmail() {
        let validationData = schema.validate({ email });

        if (validationData.error) {
            setValidateErrors(validationData.error.details);
            return false;
        } else {
            setValidateErrors(["done"]);
            return true;
        }
    }

    async function submitData(e) {
        e.preventDefault();
        if (validateUserEmail()) {
            setIsLoading(true);
            try {
                const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email: email });
                localStorage.setItem("email", email);

                navigate("/otpCode");
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
            <div className="mx-auto mt-5 authContent">
                <h2 className="mb-5">Forget Password Form</h2>

                <p className="text-center text-muted mb-3"> Please enter the email address associated with your account and we'll email you a link to reset your password.</p>

                {APiErrors && <div className="alert alert-danger">{APiErrors}</div>}

                <form onSubmit={(e) => submitData(e)}>
                    <div className="input-data my-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className={`form-control my-2 ${
                                validateErrors.length !== 0 && (validateErrors.find((e) => e.context?.label === "email") ? "is-invalid" : validateErrors[0] === "done" && "is-valid")
                            }`}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                        />
                        {validateErrors.find((e) => e.context?.label === "email") && <div className="alert alert-danger  ">{validateErrors.find((e) => e.context?.label === "email").message}</div>}
                    </div>
                    <div className="mt-3 box_buttons">
                        <button onClick={() => navigate("/login")} className={`btn btn-dark`}>
                            Back to Login
                        </button>
                        <button className={`btn btn-info`}>{isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Send Request"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}
