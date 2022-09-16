import React, { useState } from "react"

import {
  Loader,
  Card,
  Media,
  Block,
  Button,
  Heading,
  Image,
  Content,
  Container,
} from "react-bulma-components"

import axios from "axios"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

function PendingFriendCard(props) {
  return (
    <Card style={{ width: 200, margin: "auto" }} textAlign='center'>
      <Card.Content>
        <Media justifyContent='center'>
          <Media.Item display='flex' justifyContent='center' renderAs='figure'>
            <Image
              size={128}
              alt={`Picture of ${props.user.name_first} ${props.user.name_last}`}
              src={`${process.env.REACT_APP_API_URL}/file/${props.user.profile_pic}`}
            />
          </Media.Item>
        </Media>
        <Container>
          <Link to={`/users/${props.user._id}`}>
            <Heading
              size={6}
            >{`${props.user.name_first} ${props.user.name_last}`}</Heading>
          </Link>
        </Container>
        <Block></Block>
        <Content>
          <Button
            title='Request is pending'
            disabled='true'
            color={"success"}
            fullwidth='true'
            rounded='true'
          >
            Add friend
          </Button>
        </Content>
      </Card.Content>
    </Card>
  )
}

export default PendingFriendCard
