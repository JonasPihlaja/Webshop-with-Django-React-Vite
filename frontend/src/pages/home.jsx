import { AllProducts } from "../components/product"
import "../App.css"

export default function Home() {
    return (
        <div className="d-flex align-content-around flex-wrap">
            <AllProducts></AllProducts>
        </div>
    )
}