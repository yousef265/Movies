import React from "react";
import errorImage from "../../assets/images/error.svg";
export default function Notfound() {
    return (
        <>
            <div className="text-center">
                <img src={errorImage} className="w-75" alt="Error" />
            </div>
        </>
    );
}
