import React, { useState } from 'react'
import {Title, Subtitle, Content, MediaLeft, MediaContent, Image, CardContent, CardFooterItem, card, Section, Column, Columns, Modal, ModalBackground, ModalContent, ModalClose} from 'bloomer'
import { Loader, Card, Media, Block, Button, Heading  } from 'react-bulma-components'
import { Container } from 'bloomer/lib/layout/Container'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function PendingFriendCard(props) {
  
  return (
    <Card style={{ width: 200, margin: 'auto' }} textAlign='center'>
      
      <Card.Content>
        <Media justifyContent='center'>
          <Media.Item display='flex' justifyContent='center' renderAs="figure">
            <Image
              isSize="128x128"
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
          <Button title='Request is pending' disabled='true' color={'success'} fullwidth='true' rounded='true' >Add friend</Button>
        </Content>
      </Card.Content>
    </Card>
  )
}

export default PendingFriendCard