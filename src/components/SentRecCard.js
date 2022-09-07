import React from 'react'
import { Loader, Card, Media, Block, Button, Heading, Content, Image, Container } from 'react-bulma-components'

import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function SentReqCard(props) {
  //console.log(props.request)
  const token = localStorage.getItem('palstalkToken')
  const userId = localStorage.getItem('palstalkUserId')
  const updateRequests = props.updateRequests

  const accept = (id) => {
    const acceptURL = `${process.env.REACT_APP_API_URL}/requests/${props.request._id}/accept`
    axios.put(acceptURL,'', {headers: {"Authorization": `Bearer ${token}`}})
    .then(()=> {
      updateRequests()
      toast.success(`${props.request.from.name_first} ${props.request.from.name_last} is now your friend`)
    })
  }

  const cancel = (id) => {
    const cancelURL = `${process.env.REACT_APP_API_URL}/requests/${props.request._id}/cancel`
    axios.put(cancelURL,'', {headers: {"Authorization": `Bearer ${token}`}})
    .then(()=> {
      updateRequests()
      toast.info(`Cancelled request to ${props.request.to.name_first} ${props.request.to.name_last}`)
    })
  }

  return (
    <Card style={{ width: 200, margin: 'auto' }} textAlign='center'>
      
      <Card.Content>
        <Media justifyContent='center'>
          <Media.Item display='flex' justifyContent='center' renderAs="figure">
            <Image
              size={96}
              alt={`Picture of ${props.request.to.name_first} ${props.request.to.name_last}`}
              src={`${process.env.REACT_APP_API_URL}/file/${props.request.to.profile_pic}`}
            />
          </Media.Item>
          
        </Media>
        <Container>
        <Link to={`/users/${props.request.to._id}`}>
            <Heading size={4}>{`${props.request.to.name_first} ${props.request.to.name_last}`}</Heading>
            </Link>
          </Container>
          <Block></Block>
        <Content>
          
          
          <Button onClick={cancel} color={'danger'} size={'small'} rounded='true'>Cancel request</Button>
        </Content>
      </Card.Content>
    </Card>
  )
}

export default SentReqCard