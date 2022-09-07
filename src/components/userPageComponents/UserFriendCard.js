import React from 'react'

import { Loader, Card, Media, Block, Button, Heading, Container, Image } from 'react-bulma-components'

import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function UserFriendCard(props) {
  
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  const updateFriends = props.updateFriends


  return (
    <Card style={{ width: 200, margin: 'auto' }} textAlign='center'>
      
      <Card.Content>
        <Media justifyContent='center'>
          <Media.Item display='flex' justifyContent='center' renderAs="figure">
            <Image
              size={96}
              alt={`Picture of ${props.friend.name_first} ${props.friend.name_last}`}
              src={`http://localhost:3000/api/file/${props.friend.profile_pic}`}
            />
          </Media.Item>
          
        </Media>
        <Container>
            
            <Heading size={6} >{`${props.friend.name_first} ${props.friend.name_last}`}</Heading>
            
          </Container>
          <Block></Block>
        
      </Card.Content>
    </Card>
  )
}

export default UserFriendCard