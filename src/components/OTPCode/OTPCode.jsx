import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputOtp } from "primereact/inputotp";
import Joi from "joi";
import axios from "axios";

export default function OTPCode() {
    const [otpCode, setOtpCode] = useState();
    const [validationError, setValidationError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const otpSchema = Joi.string()
        .length(6)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            "string.length": "OTP must be exactly 6 digits long",
            "string.pattern.base": "OTP must contain only digits",
            "any.required": "OTP is required",
        });

    const validateOtpCode = () => {
        const { error } = otpSchema.validate(otpCode);

        if (error) {
            setValidationError(error.details[0]);
            return false;
        } else {
            setValidationError([]);
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateOtpCode()) {
            setIsLoading(true);
            try {
                const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
                    resetCode: otpCode,
                });
                navigate("/resetPassword");
                setValidationError([]);

                setIsLoading(false);
            } catch ({ response }) {
                setValidationError(response.data.message);
                setIsLoading(false);
            }
        }
    };

    const reSendCode = async () => {
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, { email: localStorage.getItem("email") });
    };

    return (
        <>
            <div className=" m-auto mt-5 w-75">
                <h2 className="mb-5">Please check your email!</h2>
                <p className="text-center text-muted ">
                    We've sent a 6-digit confirmation email to your <span className="fw-bold text-white">{localStorage.getItem("email")}</span>. Please enter the code in below box to verify your
                    email.
                </p>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="card flex justify-content-center align-items-center bg-transparent">
                        <InputOtp value={otpCode} length={6} onChange={(e) => setOtpCode(e.value)} />
                    </div>
                    {validationError.length !== 0 && <div className="alert alert-danger mt-3"> {validationError.message || validationError}</div>}
                    <div className="mt-3  ">
                        <div className="d-flex align-items-center justify-content-between ">
                            <p className="mb-0 text text-muted me-2 text-break">
                                Don’t have a code?{" "}
                                <span className="spanStyle fw-bold text-white" onClick={reSendCode}>
                                    Resend Code
                                </span>
                            </p>
                            <button className={`btn btn-info d-block `}>{isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Verify"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
