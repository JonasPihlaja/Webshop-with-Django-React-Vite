import { CartProducts } from "../components/product"
import "../App.css"

export const Cart = () => {
    return (
        <div className="d-flex align-content-around flex-wrap">
            <CartProducts></CartProducts>
        </div>
    )
}