import React, { useEffect, useState } from 'react'
import {Title, Subtitle, Content, Button, MediaLeft, MediaContent, Image, Delete, CardContent, CardFooterItem, card, Section, Column, Columns, Modal, ModalBackground, ModalContent, ModalClose, Box} from 'bloomer'
import { Loader, Card, Media, Block,   } from 'react-bulma-components'
import { DateTime } from 'luxon'
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter'
import axios from 'axios'
import PostComments from './PostComments'
import { toast } from 'react-toastify'
import {FaCommentAlt, FaThumbsDown, FaThumbsUp, FaRegCommentAlt} from 'react-icons/fa'

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
            setLike(<Button isSize='small' isColor='success' onClick={likeFn}><FaThumbsUp/>&nbsp;Like </Button>)
        } else {
            setLike(<Button isSize='small' isColor='warning' onClick={unlikeFn}><FaThumbsDown/>&nbsp;Unlike </Button>)
        }
    },[])

    //switch like to unlike after click
    const likeFn = () => {
        axios.put(likeURL, '', {headers: {"Authorization": `Bearer ${token}`}})
        .then(() => {
            axios.get(commentURL, {headers: {"Authorization": `Bearer ${token}`}})
            .then((response) => {
                setComment(response.data)
                setLike(<Button isSize='small' isColor='warning' onClick={unlikeFn}><FaThumbsDown/>&nbsp;Unlike </Button>)
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
                setLike(<Button isSize='small' isColor='success' onClick={likeFn}><FaThumbsUp/>&nbsp;Like </Button>)
            })
            })
    }

  return (
    <div>
            <Card>
                
                <CardContent>
                    <Media>
                        <MediaLeft>
                            <Image isSize='32x32' src={`http://localhost:3000/api/file/${comment.author.profile_pic}`} />
                        </MediaLeft>
                        <MediaContent>
                            <Columns is-centered >
                                <Column hasTextAlign='left' isSize='3/4'>
                                    <Title isSize={6}>{comment.author.name_first} {comment.author.name_last}<small> @ {DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}</small></Title>
                                    <div>{comment.comment}</div>
                                </Column>
                                <Column hasTextAlign='right'>
                                    <small>{comment.likes.length} Likes</small>
                                    <Block/>
                                    <div>{like}</div>
                                </Column>
                            </Columns> 
                        </MediaContent>
                    </Media>
                </CardContent>
            </Card>
    </div>
  )
}

export default Comment