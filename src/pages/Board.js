import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

function Board() {

    const navigate = useNavigate()

    
    const token = localStorage.getItem('palstalkToken')
    if (!token) {
        navigate('/login')
    }

    const logout = () => {
        localStorage.removeItem('palstalkToken')
        toast.success('Logged out successfully')
        navigate('/login')
    }

    return (
        <div>
            Board
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default Board