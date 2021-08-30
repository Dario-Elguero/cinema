import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import '../navbar/NavBar.css';

export default function NavBar() {
    
    
    return (
        <header className="navbar">
            <div>
                {/* <img className="logoIco" id="logoQuo" src="https://i.ibb.co/BVKd3ZK/quoOG.png" alt="quo" /> */}
            </div>
            
        <form className="form-container" >
          <div>
            <input
              className="inputSearch"
              type="text"
              placeholder="Title Movie"
              id="title"
              autoComplete="on"
            //   value={name}
            //   onChange={e => setName(e.target.value)}
              required
            />
            
             <button className="btn btnhome" type="submit">BUSCAR</button>
            
          </div>
          
        </form>

            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/" >Home</NavLink>
                        <NavLink exact to="/favorite" >Favorite</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}