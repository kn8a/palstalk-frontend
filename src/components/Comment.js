import React, { useEffect, useState } from 'react'
import { Loader, Card, Media, Block, Heading, Button, Image, Columns, Container  } from 'react-bulma-components'
import { DateTime } from 'luxon'
import axios from 'axios'

import { toast } from 'react-toastify'
import { FaThumbsDown, FaThumbsUp, } from 'react-icons/fa'

function Comment(props) {
    //Props
    const userId = props.userId
    const token = props.token
    const postId = props.postId

    //States
    const [comment, setComment] = useState(props.comment)
    const [like, setLike] = useState()
    
    //API URLS
    const commentURL = `http://localhost:3000/api/posts/${postId}/${comment._id}`
    const likeURL = `http://localhost:3000/api/posts/${postId}/${comment._id}/like`
    const unlikeURL = `http://localhost:3000/api/posts/${postId}/${comment._id}/unlike`
    
    //check if comment already liked by this user
    const alreadyLiked = comment.likes.indexOf(userId)
    useEffect(() => {
        if (alreadyLiked == -1) {
            setLike(<Button size='small' color='success' onClick={likeFn}><FaThumbsUp/>&nbsp;Like </Button>)
        } else {
            setLike(<Button size='small' color='warning' onClick={unlikeFn}><FaThumbsDown/>&nbsp;Unlike </Button>)
        }
    },[])

    //switch like to unlike after click
    const likeFn = () => {
        axios.put(likeURL, '', {headers: {"Authorization": `Bearer ${token}`}})
        .then(() => {
            axios.get(commentURL, {headers: {"Authorization": `Bearer ${token}`}})
            .then((response) => {
                setComment(response.data)
                setLike(<Button size='small' color='warning' onClick={unlikeFn}><FaThumbsDown/>&nbsp;Unlike </Button>)
            })
            })
    }

    //switch unlike to like after click
    const unlikeFn = () => {
        axios.put(unlikeURL, '', {headers: {"Authorization": `Bearer ${token}`}})
        .then(() => {
            axios.get(commentURL, {headers: {"Authorization": `Bearer ${token}`}})
            .then((response) => {
                setComment(response.data)
                setLike(<Button size='small' color='success' onClick={likeFn}><FaThumbsUp/>&nbsp;Like </Button>)
            })
            })
    }

  return (
    <div>
            <Card>
                
                <Card.Content display='flex' justifyContent='space-between'>
                    <Media>
                        <Media.Item align="left">
                            <Image size={32} src={`http://localhost:3000/api/file/${comment.author.profile_pic}`} />
                        </Media.Item>
                            <Media.Item align="center"  alignItems='center'> 
                            
                                
                                    <Heading size={6}>{comment.author.name_first} {comment.author.name_last}<small> @ {DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}</small></Heading>
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{comment.comment}</div>
                                
                                
                             
                        </Media.Item>
                        
                    </Media>
                    
                    <Container display='flex' justifyContent='start'  alignItems='end' flexDirection='column'>
                        <small>{comment.likes.length} Likes</small>
                                    <Block/>
                                    <div>{like}</div>
                    </Container>
                </Card.Content>
            </Card>
    </div>
  )
}

export default Comment




                                    //<div>{comment.comment}</div>