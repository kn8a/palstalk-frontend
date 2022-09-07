import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Posts from '../components/Posts'
import { Block } from 'react-bulma-components'

function Board() {

    const navigate = useNavigate()
    const postsURL = `${process.env.REACT_APP_API_URL}/posts/board`

    //states
    const [posts, setPosts] = useState()
    const [userId, setUserId] = useState()

    useEffect(() => {
        const token = localStorage.getItem('palstalkToken')
        const userId = localStorage.getItem('palstalkUserId')
        //console.log(userId)
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

    const updatePosts = () => {
        axios.get(postsURL, {headers: {"Authorization": `Bearer ${token}`}})
            .then((response) => {
                setPosts(response.data)
            })
    }

    const token = localStorage.getItem('palstalkToken')
    if (!token) {
        navigate('/login')
    }

    // const logout = () => {
    //     localStorage.removeItem('palstalkToken')
    //     localStorage.removeItem('palstalkUserId')
    //     localStorage.removeItem('palstalkUserPic')
    //     localStorage.removeItem('palstalkUserName')
    //     toast.success('Logged out successfully')
    //     navigate('/login')
    // }

    return (
        <div>
            <div></div><Block></Block>
            
            <Posts posts={posts} userId={userId} token={token} updatePosts={updatePosts}/>
        </div>
    )
}

export default Board