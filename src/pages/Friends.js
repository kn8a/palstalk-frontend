import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Block, Heading,  } from 'react-bulma-components'
import UserCard from '../components/UserCard'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'


function Friends() {

  const profileURL = `${process.env.REACT_APP_API_URL}/users/profile`
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  const navigate = useNavigate()


  const [friends, setFriends] = useState([])

  
  
  
  
  useEffect(() => {
    const token = localStorage.getItem('palstalkToken')

        if (!token) {
            navigate('/login')
        } else {
    axios.get(profileURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setFriends(response.data.friends)
      //console.log(response.data.friends)
      

  }) }
  }, [])

  const updateFriends = ()=> {
    axios.get(profileURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setFriends(response.data.friends)
  })}

  
    

  // if(friends.length == 0) {
  //   return (<div><Block></Block><Heading subtitle size={5}>You do not have any friends yet. <Link to={'/friends/find'}><a>Please visit the user directory page</a> to add friends.</Link></Heading></div>)
  // }

  

  return (
    <div>
      <Nav/>
    <Block></Block>
    <Block display='flex' flexDirection='row' id='friends-container' flexWrap='wrap'>
        {friends.map((friend) => {
            return (<UserCard updateFriends={updateFriends} key={friend._id} friend={friend}/>)
        })}
    </Block>
    </div>
    
  )
}

export default Friends