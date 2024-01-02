const parentStyle = {
    width: "152px",
    height: "220px",
    padding: "15px",
    margin: "15px",
    //filter: "drop-shadow(0px 0px 5px #666)",
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
    const handleCartClick = (id) => {
        props.addToCart(id);
    }
    return (
        <>
        <div style={parentStyle}>
            <div>
            <p style={titleStyle} className="fw-semibold">
                {props.product.name}
            </p>
            <p style={cartStyle} onClick={() => {handleCartClick(props.product.id)}}>
                + Cart
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
        </div>
        </>
  );
}

export const CartCard = (props) => {
    console.log(props)
    const handleRemoveClick = (id, updated) => {
        props.removeFromCart(id, updated);
    }
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
        </div>
        </>
  );
}