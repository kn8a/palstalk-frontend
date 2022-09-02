import React from 'react'
import {Title, Subtitle, Content, MediaLeft, MediaContent, Image, CardContent, CardFooterItem, card, Section, Column, Columns, Modal, ModalBackground, ModalContent, ModalClose} from 'bloomer'
import { Loader, Card, Media, Block, Button, Heading  } from 'react-bulma-components'
import { Container } from 'bloomer/lib/layout/Container'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function UserCard(props) {
  
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  const updateFriends = props.updateFriends

  const unfriend = (id) => {
    const unfriendURL = `http://localhost:3000/api/users/${props.friend._id}/unfriend`
    axios.put(unfriendURL,'', {headers: {"Authorization": `Bearer ${token}`}})
    .then(()=> {
      updateFriends()
      toast.info(`Unfriended ${props.friend.name_first} ${props.friend.name_last}`)
    })
  }

  return (
    <Card style={{ width: 200, margin: 'auto' }} textAlign='center'>
      
      <Card.Content>
        <Media justifyContent='center'>
          <Media.Item renderAs="figure" align="left">
            <Image
              isSize="96x96"
              alt={`Picture of ${props.friend.name_first} ${props.friend.name_last}`}
              src={`http://localhost:3000/api/file/${props.friend.profile_pic}`}
            />
          </Media.Item>
          
        </Media>
        <Container>
            <Link to={`/users/${props.friend._id}`}>
            <Heading size={4}>{`${props.friend.name_first} ${props.friend.name_last}`}</Heading>
            </Link>
          </Container>
          <Block></Block>
        <Content>
          <Button onClick={unfriend} color={'danger'} fullwidth='true' rounded='true' size={'small'}>Unfriend</Button>
        </Content>
      </Card.Content>
    </Card>
  )
}

export default UserCard