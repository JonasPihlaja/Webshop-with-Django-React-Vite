import {useEffect, useState} from "react";
import api from "../tools/api";

export const Logout = () => {

    useEffect(() => {
        api.post('logout/', {refresh_token: localStorage.getItem('refresh_token')}).then((resp) => {
            localStorage.clear()
            setTimeout(window.location.href= '/', 2000)
        }).catch((resp) => {
            console.log("Failed")
            localStorage.clear();
            setTimeout(window.location.href= '/', 2000)
        })
    }, []);
    return (
        <div></div>
    )
}