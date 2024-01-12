import { MyProducts } from "../components/product"
import "../App.css"

export const MyItems = () => {
    return (
        <div className="d-flex align-content-around flex-wrap">
            <MyProducts></MyProducts>
        </div>
    )
}