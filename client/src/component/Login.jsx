import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"


const Login = () => {
    const [user, setUser] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        
        
    }, [])

    return (
        <div className="form-container">
      <form onSubmit="" className="form">
        <h5>Login</h5>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            autoComplete="off"
            placeholder="E-mail"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div className="input-field">
          <button type="submit" className="btn" >
            Login
          </button>
          
        </div>
        <div>
          <p>Login whit social networks</p>
          <div className="google-btn" >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to='/register'>
          <div className="a-link a__signin">
            <a href="#">Create New Account</a>
            <br />
          </div>
        </Link>
      </form>
    </div>
  );
    
}

export default Login
