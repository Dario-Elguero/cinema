import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { removeFavorite } from "../../redux/action";
import "./favorite.css";

const Favorite = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(store => store.favorite)

    const handleRemove = (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem('token')
       
        dispatch(removeFavorite(token, e.target.id))
    }

    return (
        <div className="containerFavorites">
           {favorites?.map( movie =>
            <div key={movie.id} id={movie.id} className="containerMovieFav">
                <div className="titleMoviesFav">
                    {movie.title}
                       <button name="remove" id={movie.id} onClick={handleRemove} className="icoFav">X</button>
                </div>
                <Link to={`/movie/detail/${movie.id}`}>
                    <div className="imageMoviesFav">
                        <img src={movie.image} alt={movie.title} />
                    </div>
                </Link>
            </div>
            )}
        </div>
    )
}

export default Favorite
