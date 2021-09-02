import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFavorite, removeFavorite } from '../../../redux/action';
import './cardmovies.css';

const CardMovie = ({movies}) => {
const dispatch = useDispatch()
    const handleFav = (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem('token')
        if(e.target.name === "on"){
            dispatch(removeFavorite(token, e.target.id))
        }else{
            dispatch(addFavorite(token, e.target.id))
        }
    }

    const favorite = useSelector(store => store.favorite)
    return (
        <div className="containerCard">
            {movies?.map( movie =>
            <div key={movie.id} id={movie.id} className="containerMovie">
                <div className="titleMovies">
                    {movie.title}
                    {sessionStorage.getItem('token') ?
                    <>
                        {favorite?.find(fav => fav.id === movie.id) ?
                            <button name="on" id={movie.id} onClick={handleFav} className="icoFav on">♥</button> :
                            <button name="off" id={movie.id} onClick={handleFav} className="icoFav off">♥</button>
                        }
                    </>
                    :
                    null
                }
                </div>
                <div className="imageMovies">
                    <Link to={`/movie/detail/${movie.id}`}>
                        <img src={movie.image} alt={movie.title} />
                    </Link>
                </div>
            </div>
            )}
        </div>
    )
}

export default CardMovie
