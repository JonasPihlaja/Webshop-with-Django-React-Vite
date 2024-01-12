import {useEffect, useState} from "react";
import { HomeCard, CartCard, MyProductsCard, BoughtCard } from "./card";
import { Edit } from "../pages/edit";
import { Error } from "../pages/error";
import api from "../tools/api";

export const AllProducts = () => {
    localStorage.removeItem('search')
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
               api.get('products/').then((response) => {
                setProductList(response.data)
               })
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
            api.post('/cart/'+localStorage.getItem('username')+'/'+id)
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

export const CartProducts = () => {

    const payButtonStyle = {
        backgroundColor: "#a08d83",
        width: "80px",
        color: "white",
        marginBottom: 4,
        borderRadius: "8px",
        paddingRight: "6px",
        paddingLeft: "6px",
        paddingTop: "7px",
        paddingBottom: "3px",
        height: "50px",
        borderWidth: "1px",
        fontSize: "1.1rem",
        cursor: "pointer",
        position: "fixed",
        right: "5%",
        bottom: "3%",
    }

    const time = new Date().toISOString();

    const [showError, setShowError] = useState(false)
    const [errorData, setErrorData] = useState([])
    const [productCartList, setProductCartList] = useState([]);

    const [reset, setReset] = useState(false)


    useEffect(() => {
        (async () => {
            try {
                api.get('cart/'+localStorage.getItem('username')).then(response => {
                    setProductCartList(response.data)
                    setReset(false)
                   })
            } catch (e) {
                console.log('Get not working')
            }

        })();
    }, [reset]);

    const handleRemoveFromCart = async (id) => {
        if(!localStorage.getItem('username')){
            return
        }
        try {
            api.delete('cart/'+localStorage.getItem('username')+'/'+id).then(response => {
                setProductCartList(response.data)
               })
        } catch (e) {
            console.log('Delete not working')
        }
    }

    const handleBuyCart = async () => {
        const body = {
            products: productCartList,
            started: time
        }
        try {
            api.put('cart/pay/'+localStorage.getItem('username'), body).then(response => {
                console.log(response)
                setProductCartList(response.data)
               }).catch((resp) => {
                    console.log(resp)
                    setErrorData(resp.response.data[0])
                    setShowError(true)

                    setReset(true)
               })
        } catch (e) {
            console.log('Delete not working')
        }
    }

    const handleCloseModalClick = () => {
        setShowError(false)
    }

  return (
    <>
    <Error show={showError} data={errorData} closeClick={handleCloseModalClick}></Error>
    <div className="d-flex justify-content-center" style={payButtonStyle} onClick={() => {handleBuyCart()}}>
        Pay
    </div>
    {productCartList.map((row, index) => (
        <CartCard product={row} key={index} removeFromCart={handleRemoveFromCart}></CartCard>
    ))}
    </>
  );
}

export const MyProducts = () => {

    const [myProductList, setMyProductList] = useState([]);
    const [myBoughtList, setMyBoughtList] = useState([]);
    const [showEdit, setShowEdit] = useState(false)

    const [data, setData] = useState({})
    useEffect(() => {
        (async () => {
            try {
                api.get('products/'+localStorage.getItem('username')).then(response => {
                    setMyProductList(response.data.products)
                    setMyBoughtList(response.data.bought)
                   })
            } catch (e) {
                console.log('Get not working')
            }

        })();
    }, []);

    const handleEditProduct = async (id) => {
        if(!localStorage.getItem('username')){
            return
        }
        try {
            api.get('products/'+id).then(response => {
                setData(response.data)
                setShowEdit(true)
            })
        } catch (e) {
            console.log('Get not working')
        }
    }

    const handleCloseClick = () => {
        setShowEdit(false)
    }

    const handleSubmit = (data) => {
        api.put('products/'+data.id, data).then((response) => {
            setMyProductList(response.data)
        })
    }
    const handleDelete = (data) => {
        api.delete('products/'+data.id).then((response) => {
            setMyProductList(response.data)
        })
    }
  return (
    <>
        <div style={{width: "100%", padding: "20px"}}>
        <h4>My Products</h4>
        </div>
        <Edit show={showEdit} data={data} closeClick={handleCloseClick} submitClick={handleSubmit} deleteClick={handleDelete}/>
        {myProductList.map((row, index) => (
            <MyProductsCard product={row} key={index} editProduct={handleEditProduct}></MyProductsCard>
        ))}
        <div style={{width: "100%", padding: "20px"}}>
        <hr className="hr" />
        <h4>Products I have bought</h4>
        </div>
        {myBoughtList.map((row, index) => (
            <BoughtCard product={row} key={index} editProduct={handleEditProduct}></BoughtCard>
        ))}
    </>
  );
}

export const SearchProducts = () => {

    const [searchedProductList, setSearchedProductList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                api.get('products/search/'+localStorage.getItem('search')).then(response => {
                    setSearchedProductList(response.data)
                   })
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
            api.post('/cart/'+localStorage.getItem('username')+'/'+id)
        } catch (e) {
            console.log('Get not working')
        }
    }

  return (
    <>
        {searchedProductList.map((row, index) => (
            <HomeCard product={row} key={index} addToCart={handleAddToCart}></HomeCard>
        ))}
    </>
  );
}