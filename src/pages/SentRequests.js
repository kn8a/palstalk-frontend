import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Block } from 'react-bulma-components'
import SentReqCard from '../components/SentRecCard'

function SentRequests() {

  const sentURL = 'http://localhost:3000/api/requests/sent'
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  


  const [requests, setRequests] = useState([])

  
  
  
  
  useEffect(() => {
    axios.get(sentURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setRequests(response.data)
      console.log(response.data)
  }) 
  }, [])

  const updateRequests = ()=> {
    axios.get(sentURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
      setRequests(response.data)
  })}

  return (
    <div>
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