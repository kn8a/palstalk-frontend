import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Block } from 'react-bulma-components'
import { toast } from 'react-toastify'
import UserCard from '../components/UserCard'
import NonFriendCard from '../components/NonFriendCard'
import PendingFriendCard from '../components/PendingFriendCard'

function FindFriends() {

  const allUsersURL = 'http://localhost:3000/api/users/all'
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  


  const [users, setUsers] = useState({pending:[], others:[]})

  
  
  
  
  useEffect(() => {
    axios.get(allUsersURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setUsers(response.data)
      console.log(response.data)
      
  }) 
  }, [])

  const updateUsers = ()=> {
    axios.get(allUsersURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setUsers(response.data)
      
  })}

  return (
    <div>
    <Block></Block>
    <Block display='flex' flexDirection='row' id='friends-container' flexWrap='wrap'>
        {users.others.map((user) => {
            return (<NonFriendCard updateUsers={updateUsers} key={user._id} user={user}/>)
        })}

        {users.pending.map((user) => {
            return (<PendingFriendCard updateUsers={updateUsers} key={user._id} user={user}/>)
        })}

    </Block>
    </div>
    
  )
}

export default FindFriends