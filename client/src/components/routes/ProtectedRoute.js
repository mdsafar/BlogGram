import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import NotFound from '../layout/NotFound/NotFound'

 export const ProtectedRoute = ({ element }) => {
    const { user } = useSelector((state) => state.user)
    return (
        user?.emailVerified === true ? element : <Navigate to={'/login'} />
    )
}

export const AdminRoute = ({element})=>{
    const { user } = useSelector((state)=> state.user)
    return(
        user?.emailVerified === true ? user?.role === 'admin' ? element : <NotFound/> : <Navigate to={'/login'}/>
    )
}