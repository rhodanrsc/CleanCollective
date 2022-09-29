import React, { useState, useEffect } from "react";
import axios from "axios";

const ConfirmEmail = props =>(
    <div className="card">
        <h2>A verification link has been sent to your email</h2>
        <p className="card-body">Please click the link that has just been sent to complete registration!</p>
    </div>
    
)

export default ConfirmEmail;