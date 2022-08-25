import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Block } from 'react-bulma-components'
import { toast } from 'react-toastify'
import UserCard from '../components/UserCard'

function Friends() {

  const profileURL = 'http://localhost:3000/api/users/profile'
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  


  const [friends, setFriends] = useState([])

  
  
  
  
  useEffect(() => {
    axios.get(profileURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setFriends(response.data.friends)
      console.log(response.data.friends)
  }) 
  }, [])

  const updateFriends = ()=> {
    axios.get(profileURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setFriends(response.data.friends)
  })}

  return (
    <div>
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