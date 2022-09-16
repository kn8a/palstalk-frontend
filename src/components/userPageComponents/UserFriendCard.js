import React from "react"
import {
  Card,
  Media,
  Block,
  Heading,
  Container,
  Image,
} from "react-bulma-components"

function UserFriendCard(props) {
  return (
    <Card style={{ width: 200, margin: "auto" }} textAlign='center'>
      <Card.Content>
        <Media justifyContent='center'>
          <Media.Item display='flex' justifyContent='center' renderAs='figure'>
            <Image
              size={96}
              alt={`Picture of ${props.friend.name_first} ${props.friend.name_last}`}
              src={`${process.env.REACT_APP_API_URL}/file/${props.friend.profile_pic}`}
            />
          </Media.Item>
        </Media>
        <Container>
          <Heading
            size={6}
          >{`${props.friend.name_first} ${props.friend.name_last}`}</Heading>
        </Container>
        <Block></Block>
      </Card.Content>
    </Card>
  )
}

export default UserFriendCard
