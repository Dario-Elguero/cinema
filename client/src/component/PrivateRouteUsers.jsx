import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { verifyToken } from './verifyToken/verifyToken'

const PrivateRouteUsers = ({component:Component,...rest}) => {
    const rol = verifyToken(sessionStorage.getItem('token'))
    return (
        <Route {...rest}>
            {rol === 1 || rol === 2 ? <Component /> : <Redirect to="home" />}
        </Route>
    )
}

export default PrivateRouteUsers
