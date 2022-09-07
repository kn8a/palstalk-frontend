import React, { useState } from 'react'
import { Loader, Card, Media, Block, Button, Heading, Content, Image, Container } from 'react-bulma-components'

import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function NonFriendCard(props) {
  const navigate = useNavigate()
  //console.log(props)
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  const updateUsers = props.updateUsers

  const [disabled, setDisabled] = useState(false)

  const sendFriendRequest = (id) => {
    const addFriendURL = `http://localhost:3000/api/users/${props.user._id}/send-friend-request`
    axios.post(addFriendURL,'', {headers: {"Authorization": `Bearer ${token}`}})
    .then(()=> {
      //updateUsers()
      setDisabled(true)
      toast.info(`Sent friend request to ${props.user.name_first} ${props.user.name_last}`)
    })
  }

  return (
    <Card style={{ width: 200, margin: 'auto' }} textAlign='center'>
      
      <Card.Content>
        <Media justifyContent='center' display='flex'>
          <Media.Item renderAs="figure" display='flex' justifyContent='center'>
            <Image
              size={128}
              alt={`Picture of ${props.user.name_first} ${props.user.name_last}`}
              src={`http://localhost:3000/api/file/${props.user.profile_pic}`}
            />
          </Media.Item>
          
        </Media>
        <Container>
            <Link to={`/users/${props.user._id}`}>
            <Heading size={6}>{`${props.user.name_first} ${props.user.name_last}`}</Heading>
            </Link>
            
            
          </Container>
          <Block></Block>
        <Content>
          <Button onClick={sendFriendRequest} disabled={disabled} color={'success'} fullwidth='true' rounded='true' >Add friend</Button>
        </Content>
      </Card.Content>
    </Card>
  )
}

export default NonFriendCard