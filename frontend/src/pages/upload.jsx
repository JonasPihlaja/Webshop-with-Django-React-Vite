import {useState, useEffect} from "react";
import api from "../tools/api";

export const Upload = () => {
    if(localStorage.getItem('access_token') == null){
      window.location.href = '/login'
    }

    const [username, setUsername] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');

    useEffect(() => {
      setUsername(localStorage.getItem('username'))
    }, []);

    const submit = async e => {
        e.preventDefault();

        const user = {
            owner: username,
            name: productName,
            description: productDescription,
            price: productPrice,
          };
          console.log(user.username)
        api.post('products/', user).then((resp) => {
          window.location.href = '/myitems'
        }
        )
    }

    return(
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Upload product</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                className="form-control mt-1"
                placeholder="Enter Username"
                name='username'
                type='text'
                value={username}
                required
                disabled
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Product name</label>
              <input
                className="form-control mt-1"
                placeholder="Enter product name"
                name='productName'
                type='text'
                value={productName}
                required
                onChange={e => setProductName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Product description</label>
              <input
                className="form-control mt-1"
                placeholder="Enter product description"
                name='productDescription'
                type='text'
                value={productDescription}
                required
                onChange={e => setProductDescription(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Price</label>
              <input
                name='price'
                type="number"
                className="form-control mt-1"
                placeholder="Enter price"
                value={productPrice}
                required
                onChange={e => setProductPrice(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
    </div>
    )
}