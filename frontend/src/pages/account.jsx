
import axios from "axios";
import {useState, useEffect} from "react";

export const Account = () => {
  if(localStorage.getItem('access_token') == null){
    window.location.href = '/login'
  }
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
      setUsername(localStorage.getItem('username'))
    }, []);

    const submit = async e => {
        e.preventDefault();

        const user = {
            username: username,
            password: oldPassword,
            newPassword: newPassword,
          };

        const data = await axios.post('http://localhost:8000/api/password/', user ,{headers: {
            'Content-Type': 'application/json'
        }}, {withCredentials: true});

        if (data.status === 200) {
          window.location.href = '/'
        }
    }

    return(
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Change password</h3>
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
              />
            </div>
            <div className="form-group mt-3">
              <label>Old password</label>
              <input
                name='password'
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={oldPassword}
                required
                onChange={e => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>New password</label>
              <input
                name='password'
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={newPassword}
                required
                onChange={e => setNewPassword(e.target.value)}
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