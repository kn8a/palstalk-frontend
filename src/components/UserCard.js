import React from 'react'
import {Title, Subtitle, Content, MediaLeft, MediaContent, Image, CardContent, CardFooterItem, card, Section, Column, Columns, Modal, ModalBackground, ModalContent, ModalClose} from 'bloomer'
import { Loader, Card, Media, Block, Button, Heading  } from 'react-bulma-components'
import { Container } from 'bloomer/lib/layout/Container'

function UserCard() {
  return (
    <Card style={{ width: 200, margin: 'auto' }}>
      
      <Card.Content>
        <Media>
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
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris. <a>@bulmaio</a>.<a href="#1">#css</a>{' '}
          <a href="#2">#responsive</a>
          <br />
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </Content>
      </Card.Content>
    </Card>
  )
}

export default UserCard