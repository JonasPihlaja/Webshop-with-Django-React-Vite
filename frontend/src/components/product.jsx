import {useEffect, useState} from "react";
import axios from "axios";
import { HomeCard, CartCard } from "./card";

export const AllProducts = (props) => {

    const [productList, setProductList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('http://localhost:8000/api/products/',{
                } ,{headers: {
                    'Content-Type': 'application/json'
                }});
                console.log(data)
                setProductList(data);
            } catch (e) {
                console.log('Get not working')
            }

        })();
    }, []);

    const handleAddToCart = async (id) => {
        console.log(id)
        if(!localStorage.getItem('username')){
            return
        }
        try {
            const {data} = await axios.post(`http://localhost:8000/api/cart/${localStorage.getItem('username')}/${id}`,{
                refresh_token:localStorage.getItem('refresh_token')
            } ,{headers: {
                'Content-Type': 'application/json'
            }}, {withCredentials: true});
            console.log(data)
        } catch (e) {
            console.log('Get not working')
        }
    }

  return (
    <>
    {productList.map((row, index) => (
        <HomeCard product={row} key={index} addToCart={handleAddToCart}></HomeCard>
    ))}
    </>
  );
}

export const CartProducts = (props) => {

    const [productCartList, setProductCartList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`http://localhost:8000/api/cart/${localStorage.getItem('username')}`,{
                } ,{headers: {
                    'Content-Type': 'application/json'
                }});
                setProductCartList(data);
            } catch (e) {
                console.log('Get not working')
            }

        })();
    }, []);

    const handleRemoveFromCart = async (id, updated) => {
        console.log(id)
        if(!localStorage.getItem('username')){
            return
        }
        try {
            const {data} = await axios.delete(`http://localhost:8000/api/cart/${localStorage.getItem('username')}/${id}`,
            {
                refresh_token:localStorage.getItem('refresh_token'),
                updated: updated
            },
            {
                headers: {
                'Content-Type': 'application/json'
                }
            }, 
            {
                withCredentials: true
            });
            setProductCartList(data)
        } catch (e) {
            console.log('Delete not working')
        }
    }

  return (
    <>
    {productCartList.map((row, index) => (
        <CartCard product={row} key={index} removeFromCart={handleRemoveFromCart}></CartCard>
    ))}
    </>
  );
}