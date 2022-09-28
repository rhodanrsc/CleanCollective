import React, { useState } from "react";
import axios from "axios";

function SendEmail() {
    const [sent, setSent] = useState(false)
    const [text, setText] = useState("")
    const handleSend = async () => {
        setSent(true)
        try{
            await axios.post("http://localhost:5000/send_mail", {
                text
            });
        }catch (error){

        }
    }

}

export default SendEmail;