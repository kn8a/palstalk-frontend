import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Block, Content, Heading } from 'react-bulma-components'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import NonFriendCard from '../components/NonFriendCard'
import PendingFriendCard from '../components/PendingFriendCard'

function FindFriends(props) {

  const allUsersURL = `${process.env.REACT_APP_API_URL}/users/all`
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  const navigate = useNavigate()


  const [users, setUsers] = useState({pending:[], others:[]})


    
  
  
  
  useEffect(() => {
      const token = localStorage.getItem('palstalkToken')
        
        //console.log(userId)
        

        if (!token) {
            navigate('/login')
        } else {
      axios.get(allUsersURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setUsers(response.data)
      //console.log(response.data)
      
  })
    }
     
  }, [])

  const updateUsers = ()=> {
    axios.get(allUsersURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setUsers(response.data)
      
  })}



  // if(users.pending.length == 0 && users.pending.length == 0) {
  //   return (<div><Block></Block><Heading subtitle size={5}>There are no users who are not your friends already.  <Link to={'/friends'}><a>Please visit your friends page</a></Link></Heading></div>)
  // }

  return (
    <div>
    <Nav/>
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