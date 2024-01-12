import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useEffect, useState } from "react";

export default function Navbar() {
    const [searchString, setSearchString] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
      if (localStorage.getItem('access_token') !== null) {
          //console.log(localStorage.getItem('access_token'));
          setIsAuth(true); 
       }
     }, [isAuth]);

     const setSearchValues = (value) => {
      setSearchString(value)
      localStorage.setItem('search', value)
     }

    const search =  e => {
        e.preventDefault();
        window.location.href = '/search'
    }

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Sellers Market
      </Link>
      <div style={{width: "30%", padding: "2px", display: "inherit"}}>
        <input
          className="form-control mt-1 mb-1"
          placeholder="Search ..."
          name='search'
          type='text'
          value={searchString}
          onChange={e => setSearchValues(e.target.value)}
        />
        <button className="btn btn-primary mt-1 mb-1" onClick={search}>
          Search
        </button>
      </div>
      <ul>
            <CustomLink to="/populate">Populate DB</CustomLink> 
        { isAuth ? (
          <>
            <CustomLink to="/upload">Upload</CustomLink>
            <CustomLink to="/cart">Cart</CustomLink>
            <CustomLink to="/myitems">My products</CustomLink>
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