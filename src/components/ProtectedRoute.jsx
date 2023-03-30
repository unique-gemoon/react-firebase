import React from "react";
import {Route, Navigate } from 'react-router-dom'

const ProtectedRoute = ({component: Component, user}) => {

    if(user) {
        return <Route render={ <Component/>} />
    }
    else{
        return (
            <Navigate to="/"/>
        )
    }
}

export default ProtectedRoute;