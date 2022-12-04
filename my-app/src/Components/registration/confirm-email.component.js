import React from "react";
import { useParams } from "react-router-dom";

export default function ConfirmEmail() {

    const params = useParams()

    return (
        <div className="card">
            <div className="container">
                <h2 className="card-header">An email has been sent to {params.email}</h2>
                <p className="card-body">Please check that your account information is correct.</p>
            </div>
        </div>
    )

}

