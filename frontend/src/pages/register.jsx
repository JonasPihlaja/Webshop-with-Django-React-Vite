import axios from "axios";
import {useState} from "react";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const submit = async e => {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
            email: email
          };

        const {data} = await axios.post('http://localhost:8000/api/register/', user ,{headers: {
            'Content-Type': 'application/json'
        }});

        console.log(data)
        localStorage.clear();
        window.location.href = '/login'

    }

    return(
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Register</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                className="form-control mt-1"
                placeholder="Enter Username"
                name='username'
                type='text'
                value={username}
                required
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                className="form-control mt-1"
                placeholder="Enter Email"
                name='email'
                type='text'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name='password'
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
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