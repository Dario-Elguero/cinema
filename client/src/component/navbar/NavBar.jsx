import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import logocinema from '../../img/logo-cinema.png';
import { allMovies, allMovies2, myFavorites } from '../../redux/action';
import {useHistory} from 'react-router-dom';
import {verifyToken} from '../verifyToken/verifyToken';
//import jsonwebtoken from 'jsonwebtoken';
import '../navbar/NavBar.css';

export default function NavBar() {
    const [title, setTitle] = useState()
    const [user, setUser] = useState()
    const history = useHistory()
    const HandleLogin  = () =>{
        history.push('/login')
    }

    const HandleLogOut  = () =>{
      sessionStorage.removeItem('token')
      dispatch({type:'LOGOUT', payload: ""})
      history.push('/')

  }

    //const userToken = useSelector(store => store.userToken)
    const userToken = sessionStorage.getItem('token')
    const dispatch = useDispatch();
    
      useEffect(() => {
        dispatch(allMovies2())
        if(userToken){
          dispatch(myFavorites(userToken))
        }
       
      }, [])

    return (
        <header className="navbar">
            <div className="logocinema">
                <img className="logoIco" id="logo" src={logocinema} alt="cinema" />
            </div>
            
        <form className="form-container-navbar" >
          <div>
            <input
              className="inputSearch"
              type="text"
              placeholder="Title Movie"
              id="title"
              autoComplete="on"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            
             <button className="btn btnhome" type="submit">BUSCAR</button>
            
          </div>
          
        </form>

            <nav>
                <ul className="list">
                    <li className="list-item">
                    {
                      userToken ?
                      <>
                      <NavLink exact to="/" >Home</NavLink>
                      <NavLink exact to="/favorite" >Favorite</NavLink>
                      {verifyToken(userToken) === 1 ?
                      <NavLink exact to="/admin" >Admin</NavLink>
                      :
                      null
                      }
                      </>
                      :
                      <NavLink exact to="/" >Home</NavLink>
                    }
                        
                    </li>
                </ul>
               
            </nav>
            <div className="login-register">
              {
                userToken ?
                <button onClick={HandleLogOut}>LogOut</button> :
                <button onClick={HandleLogin}>LogIn</button>
              }
            </div>
        </header>
    )
}