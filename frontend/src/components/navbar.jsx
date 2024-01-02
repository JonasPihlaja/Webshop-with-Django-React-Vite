import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
      if (localStorage.getItem('access_token') !== null) {
          //console.log(localStorage.getItem('access_token'));
          setIsAuth(true); 
       } else {
        //console.log(localStorage.getItem('access_token'));
        
       }
     }, [isAuth]);

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Sellers Market
      </Link>
      <ul>
            <CustomLink to="/populate">Populate DB</CustomLink> 
        { isAuth ? (
          <>
            <CustomLink to="/cart">Cart</CustomLink>
            <CustomLink to="/account">Edit account</CustomLink>
            <CustomLink to="/logout">Logout</CustomLink> 
          </>
        ) : (
          <>
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/signup">Register</CustomLink>
          </>
        )
        }
        </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}