import {useState, useEffect} from "react";

const parentStyle = {
    width: "154px",
    height: "268px",
    padding: "15px",
    margin: "15px",
    backgroundColor: "#fff2eb",
    borderRadius: "4px",
    boxShadow: "4px 4px 4px #efdfd6"
};

const titleStyle = {
    fontSize: "1rem",
    margin: 0
}

const descStyle = {
    fontSize: "0.8rem"
}
const priceAndUserStyle = {
    fontSize: "0.8rem",
    marginBottom: "2px"
}

const cartStyle = {
    backgroundColor: "#816d63",
    width: "fit-content",
    color: "white",
    marginTop: 4,
    marginBottom: 4,
    borderRadius: "4px",
    paddingRight: "6px",
    paddingLeft: "6px",
    paddingTop: "3px",
    paddingBottom: "3px",
    height: "auto",
    borderWidth: "1px",
    fontSize: "0.7rem",
    cursor: "pointer"
}

export const HomeCard = (props) => {
    const [cartStatus, setCartStatus] = useState('+ Cart');

    useEffect(() => {
    if(!localStorage.getItem('username')){
        setCartStatus('')
    }
    }, []);


    const handleCartClick = (id) => {
        const isOkay = props.addToCart(id);
        isOkay ? setCartStatus('Added') : setCartStatus('+ Cart')
    }
    const dateObject = new Date(props.product.created);
    const formattedDate = `${dateObject.getUTCDate()}/${dateObject.getUTCMonth() + 1}/${dateObject.getUTCFullYear()} ${dateObject.getUTCHours()}:${dateObject.getUTCMinutes()}:${dateObject.getUTCSeconds()}`;

    return (
        <>
        <div style={parentStyle}>
            <div>
            <p style={titleStyle} className="fw-semibold">
                {props.product.name}
            </p>
            <p style={cartStatus !== '' ? cartStyle : null} onClick={() => {handleCartClick(props.product.id)}}>
                {cartStatus}
            </p>
            </div>
            <div className="d-flex justify-content-between">
            <p className="fw-light" style={priceAndUserStyle}>
                {props.product.price}€
            </p>
            <p className="fw-lighter" style={priceAndUserStyle}>
                {props.product.owner}
            </p>
            </div>
            <p className="fw-normal" style={descStyle}>
                {props.product.description}
            </p>
            <p className="fw-light" style={priceAndUserStyle}>
                {formattedDate}
            </p>
        </div>
        </>
  );
}

export const CartCard = (props) => {
    const handleRemoveClick = (id, updated) => {
        props.removeFromCart(id, updated);
    }
    const dateObject = new Date(props.product.created);
    const formattedDate = `${dateObject.getUTCDate()}/${dateObject.getUTCMonth() + 1}/${dateObject.getUTCFullYear()} ${dateObject.getUTCHours()}:${dateObject.getUTCMinutes()}:${dateObject.getUTCSeconds()}`;

    return (
        <>
        <div style={parentStyle}>
            <div>
            <p style={titleStyle} className="fw-semibold">
                {props.product.product.name}
            </p>
            <p style={cartStyle} onClick={() => {handleRemoveClick(props.product.product.id, props.product.product.updated)}}>
                - Remove
            </p>
            </div>
            <div className="d-flex justify-content-between">
            <p className="fw-light" style={priceAndUserStyle}>
                {props.product.product.price}€
            </p>
            <p className="fw-lighter" style={priceAndUserStyle}>
                {props.product.product.owner}
            </p>
            </div>
            <p className="fw-normal" style={descStyle}>
                {props.product.product.description}
            </p>
            <p className="fw-light" style={priceAndUserStyle}>
                {formattedDate}
            </p>
        </div>
        </>
  );
}

export const MyProductsCard = (props) => {
    const handleEditClick = (id, updated) => {
        props.editProduct(id, updated);
    }
    const dateObject = new Date(props.product.created);
    const formattedDate = `${dateObject.getUTCDate()}/${dateObject.getUTCMonth() + 1}/${dateObject.getUTCFullYear()} ${dateObject.getUTCHours()}:${dateObject.getUTCMinutes()}:${dateObject.getUTCSeconds()}`;

    return (
        <>
        <div style={parentStyle}>
            <div>
            <p style={titleStyle} className="fw-semibold">
                {props.product.name}
            </p>
            <p style={cartStyle} onClick={() => {handleEditClick(props.product.id, props.product.updated)}}>
                Edit
            </p>
            </div>
            <div className="d-flex justify-content-between">
            <p className="fw-light" style={priceAndUserStyle}>
                {props.product.price}€
            </p>
            <p className="fw-lighter" style={priceAndUserStyle}>
                {props.product.owner}
            </p>
            </div>
            <p className="fw-normal" style={descStyle}>
                {props.product.description}
            </p>
            <p className="fw-light" style={priceAndUserStyle}>
                {props.product.status}
            </p>
            <p className="fw-light" style={priceAndUserStyle}>
                {formattedDate}
            </p>
        </div>
        </>
  );
}

export const BoughtCard = (props) => {
    const dateObject = new Date(props.product.created);
    const formattedDate = `${dateObject.getUTCDate()}/${dateObject.getUTCMonth() + 1}/${dateObject.getUTCFullYear()} ${dateObject.getUTCHours()}:${dateObject.getUTCMinutes()}:${dateObject.getUTCSeconds()}`;

    return (
        <>
        <div style={parentStyle}>
            <div>
            <p style={titleStyle} className="fw-semibold">
                {props.product.product.name}
            </p>
            <p style={cartStyle}>
                BOUGHT
            </p>
            </div>
            <div className="d-flex justify-content-between">
            <p className="fw-light" style={priceAndUserStyle}>
                {props.product.product.price}€
            </p>
            <p className="fw-lighter" style={priceAndUserStyle}>
                {props.product.product.owner}
            </p>
            </div>
            <p className="fw-normal" style={descStyle}>
                {props.product.product.description}
            </p>
            <p className="fw-light" style={priceAndUserStyle}>
                {formattedDate}
            </p>
        </div>
        </>
  );
}