import { useSelector } from "react-redux"
import CardMovie from "./cardmovie/CardMovie"
import './containermovies.css';

const ContainerMovie = () => {
const movies = useSelector(store => store.movies)

    return (
        <div className="containerMovies">
           
          <CardMovie movies={movies}/>
            
        </div>
    )
}

export default ContainerMovie
