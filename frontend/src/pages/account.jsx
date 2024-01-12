import api from "../tools/api";
import {useState, useEffect} from "react";
import { Error } from "./error";

export const Account = () => {
  if(localStorage.getItem('access_token') == null){
    window.location.href = '/login'
  }
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [showError, setShowError] = useState(false)
    const [errorData, setErrorData] = useState('')

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

        api.post('/password/', user).then((resp) => {
          console.log(resp);
          if(resp.status == 200){
            window.location.href = '/'
          }
        }).catch((resp) => {
          console.log(resp)
          setErrorData(resp.response.data)
          setShowError(true)
        })
    }

    const handleCloseModalClick = () => {
      setShowError(false)
    }

    return(
      <>
        <Error show={showError} data={errorData} closeClick={handleCloseModalClick}></Error>
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
    </>
    )
}