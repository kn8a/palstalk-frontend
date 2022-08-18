import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Posts from '../components/Posts'


function Board() {

    const navigate = useNavigate()
    const postsURL = `http://localhost:3000/api/posts/board`

    //states
    const [posts, setPosts] = useState()
    const [userId, setUserId] = useState()

    useEffect(() => {
        const token = localStorage.getItem('palstalkToken')
        const userId = localStorage.getItem('palstalkUserId')
        console.log(userId)
        setUserId(userId)

        if (!token) {
            navigate('/login')
        } else {
            axios.get(postsURL, {headers: {"Authorization": `Bearer ${token}`}})
            
            //setUserId(userId)
            .then((response) => {
                setPosts(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },[])


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
            <Posts posts={posts} userId={userId} token={token}/>
        </div>
    )
}

export default Board