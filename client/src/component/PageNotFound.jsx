import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    
    return (
        <div className="notFound">
            <h1>PAGE NOT FOUND</h1>
            <Link to="/home">
                <p>go to de home</p>
            </Link>
        </div>
    )
}

export default PageNotFound
