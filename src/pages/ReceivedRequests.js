import axios from "axios"
import React, { useEffect, useState } from "react"
import { Block } from "react-bulma-components"
import { useNavigate } from "react-router-dom"
import Nav from "../components/Nav"
import ReqRecCard from "../components/RecReqCard"

function ReceivedRequests() {
  const receivedURL = `${process.env.REACT_APP_API_URL}/requests/received`
  const token = localStorage.getItem("palstalkToken")
  const userId = localStorage.getItem("palstalkUserId")
  const navigate = useNavigate()

  const [requests, setRequests] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("palstalkToken")

    if (!token) {
      navigate("/login")
    } else {
      axios
        .get(receivedURL, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setRequests(response.data)
          console.log(response.data)
        })
    }
  }, [])

  const updateRequests = () => {
    axios
      .get(receivedURL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setRequests(response.data)
      })
  }

  return (
    <div>
      <Nav />
      <Block></Block>
      <Block
        display='flex'
        flexDirection='row'
        id='friends-container'
        flexWrap='wrap'
      >
        {requests.map((req) => {
          return (
            <ReqRecCard
              updateRequests={updateRequests}
              key={req._id}
              request={req}
            />
          )
        })}
      </Block>
    </div>
  )
}

export default ReceivedRequests
