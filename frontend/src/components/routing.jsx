import { Route, Routes } from "react-router-dom"

// Pages to navigate
import Home from "../pages/home"
import { Login } from "../pages/login"
import { Register } from "../pages/register"
import { Logout } from "../pages/logout"
import { Populate } from "../pages/populate"
import { Account } from "../pages/account"
import { Cart } from "../pages/cart"
import { Upload } from "../pages/upload"
import { MyItems } from "../pages/myitems"
import { Edit } from "../pages/edit"
import { Search } from "../pages/search"

function Routing() {     
    return (
        <div className="container pt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/myitems" element={<MyItems />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/populate" element={<Populate />} />
            <Route path="/account" element={<Account />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
    )
  }
  
  export default Routing