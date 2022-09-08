import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Block } from 'react-bulma-components'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import SentReqCard from '../components/SentRecCard'

function SentRequests() {

  const sentURL = `${process.env.REACT_APP_API_URL}/requests/sent`
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  const navigate = useNavigate()


  const [requests, setRequests] = useState([])

  
  
  
  
  useEffect(() => {
    const token = localStorage.getItem('palstalkToken')

        if (!token) {
            navigate('/login')
        } else {
    axios.get(sentURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setRequests(response.data)
      console.log(response.data)
  }) }
  }, [])

  const updateRequests = ()=> {
    axios.get(sentURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setRequests(response.data)
  })}

  return (
    <div>
      <Nav/>
    <Block></Block>
    <Block display='flex' flexDirection='row' id='friends-container' flexWrap='wrap'>
        {requests.map((req) => {
            return (<SentReqCard updateRequests={updateRequests} key={req._id} request={req}/>)
        })}
    </Block>
    </div>
    
  )
}

export default SentRequests