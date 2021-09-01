import { useDispatch, useSelector } from "react-redux"
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
                <div className="imageMoviesFav">
                    <img src={movie.image} alt={movie.title} />
                </div>
            </div>
            )}
        </div>
    )
}

export default Favorite
