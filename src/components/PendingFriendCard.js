import React, { useState } from 'react'
import {Title, Subtitle, Content, MediaLeft, MediaContent, Image, CardContent, CardFooterItem, card, Section, Column, Columns, Modal, ModalBackground, ModalContent, ModalClose} from 'bloomer'
import { Loader, Card, Media, Block, Button, Heading  } from 'react-bulma-components'
import { Container } from 'bloomer/lib/layout/Container'
import axios from 'axios'
import { toast } from 'react-toastify'

function PendingFriendCard(props) {
  
  return (
    <Card style={{ width: 200, margin: 'auto' }} textAlign='center'>
      
      <Card.Content>
        <Media justifyContent='center'>
          <Media.Item renderAs="figure" align="left">
            <Image
              isSize="128x128"
              alt={`Picture of ${props.user.name_first} ${props.user.name_last}`}
              src={props.user.profile_pic}
            />
          </Media.Item>
          
        </Media>
        <Container>
            <Heading size={6}>{`${props.user.name_first} ${props.user.name_last}`}</Heading>
            
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