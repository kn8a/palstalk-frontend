import React from 'react'
import {Title, Subtitle, Content, MediaLeft, MediaContent, Image, CardContent, CardFooterItem, card, Section, Column, Columns, Modal, ModalBackground, ModalContent, ModalClose} from 'bloomer'
import { Loader, Card, Media, Block, Button, Heading  } from 'react-bulma-components'
import { Container } from 'bloomer/lib/layout/Container'

function UserCard() {
  return (
    <Card style={{ width: 200, margin: 'auto' }} textAlign='center'>
      
      <Card.Content>
        <Media justifyContent='center'>
          <Media.Item renderAs="figure" align="left">
            <Image
              size={32}
              alt="64x64"
              src="http://bulma.io/images/placeholders/64x64.png"
            />
          </Media.Item>
          
        </Media>
        <Container>
            <Heading size={4}>John Smith</Heading>
            <Heading subtitle size={6}>
              @johnsmith
            </Heading>
          </Container>
          <Block></Block>
        <Content>
          <Button color={'warning'} fullwidth='true' rounded='true' size={'small'}>Unfriend</Button>
        </Content>
      </Card.Content>
    </Card>
  )
}

export default UserCard