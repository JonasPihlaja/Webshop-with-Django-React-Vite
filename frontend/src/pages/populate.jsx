import {useEffect, useState} from "react";
import api from "../tools/api";
export const Populate = () => {

    useEffect(() => {
        api.post('populate/').then((resp) => {
            window.location.href = '/logout'
        })
    }, []);
    return (
        <div></div>
    )
}