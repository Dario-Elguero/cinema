import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, myFavorites } from "../../redux/action";
import {useHistory} from 'react-router-dom';
import './login.css';


const Login = () => {
    const [user, setUser] = useState()
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        
    }, [])

    const [signState, setSignState] = useState({
      email: "",
      password: "",
    });

    const handleInputChange = ({ target }) => {
      setSignState({
        ...signState,
        [target.name]: target.value,
      });
    };

    const { email, password } = signState;

    const handleSignIn = async (e) => {
      e.preventDefault();
      await dispatch(loginUser(email, password));
      history.push('/')
      dispatch(myFavorites(sessionStorage.getItem('token')))
    };

    return (
        <div className="form-container">
      <form onSubmit={handleSignIn} className="form">
        <h5>Login</h5>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            autoComplete="off"
            placeholder="E-mail"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-field">
          <button type="submit" className="btn" >
            Login
          </button>
          
        </div>
        
        <Link to='/register'>
          <div className="a-link a__signin">
            Create New Account
            <br />
          </div>
        </Link>
      </form>
    </div>
  );
    
}

export default Login
