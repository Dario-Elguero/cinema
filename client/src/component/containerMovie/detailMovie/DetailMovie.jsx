import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findMovie } from '../../../redux/action'
import "./detailmovie.css"

const DetailMovie = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const movies = useSelector(store => store.movies)

    const [movieSelect, SetMovieSelect] = useState()
    
    useEffect(() => {
        console.log(movieSelect)
        if (!movieSelect){
            dispatch(findMovie(id))
        }
        SetMovieSelect(movies.find(mov => mov.id === Number(id)))
        console.log(movieSelect)
    }, [])

    return (
        <div className="containerDet">
            <div className="imgMov">
                <div className="titleDet">
                    {movieSelect?.title}
                </div>
                <img className="poster" src={movieSelect?.image} alt={movieSelect?.title} />
            <div className="containerDescript">
                <span>{movieSelect?.year}</span>
                <span className="description">
                    {movieSelect?.description}
                </span>
            <div className="genres">
                {movieSelect?.genre.map(gen =>(
                    <div className="genre">
                        {gen.description}
                    </div>
                )
                 )}
            </div>
            </div>
            </div>
            
        </div>
    )
}

export default DetailMovie
