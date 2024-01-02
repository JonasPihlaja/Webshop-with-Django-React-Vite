import {useEffect, useState} from "react";
import axios from "axios";

export const Populate = () => {

    useEffect(() => {
        (async () => {
            try {
                await axios.post('http://localhost:8000/api/populate/',{
                } ,{headers: {
                    'Content-Type': 'application/json'
                }});

                window.location.href = '/logout'
            } catch (e) {
                console.log('populate not working')
            }
        })();
    }, []);
    return (
        <div></div>
    )
}