import React, { useEffect, useState } from 'react'
import {Title, Subtitle, Content, MediaLeft, MediaContent, Image, CardContent, CardFooterItem, card, Section, Column, Columns, Modal, ModalBackground, ModalContent, ModalClose} from 'bloomer'
import { Loader, Card, Media, Block, Button  } from 'react-bulma-components'
import { DateTime } from 'luxon'
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter'
import axios from 'axios'
import PostComments from './PostComments'

function Post(props) {
    //Props
    const userId = props.userId
    const token = props.token

    //states
    const [post, setPost] = useState(props.post)
    const [like, setLike] = useState()
    const [commentsModal, setCommentsModal] = useState('')

    //API URLS
    const postURL = `http://localhost:3000/api/posts/${post._id}`
    const likeURL = `http://localhost:3000/api/posts/${post._id}/like`
    const unlikeURL = `http://localhost:3000/api/posts/${post._id}/unlike`
    
    //check if user liked current post
    const alreadyLiked = post.likes.indexOf(userId)
    useEffect(() => {
        if (alreadyLiked == -1) {
            setLike(<a onClick={likeFn}>Like</a>)
        } else {
            setLike(<a onClick={unlikeFn}>Unlike</a>)
        }
    },[])

    //pass to comment and updates post when a new comment is submitted
    const updatePost = () => {
        axios.get(postURL, {headers: {"Authorization": `Bearer ${token}`}})
            .then((response) => {
                setPost(response.data)
            })
    }

    //like and switch like to unlike after click
    const likeFn = () => {
        axios.put(likeURL, '', {headers: {"Authorization": `Bearer ${token}`}})
        .then(() => {
            axios.get(postURL, {headers: {"Authorization": `Bearer ${token}`}})
            .then((response) => {
                setPost(response.data)
                setLike(<a onClick={unlikeFn}>Unlike</a>)
            })
        })
    }

    //unlike and switch unlike to like after click
    const unlikeFn = () => {
        axios.put(unlikeURL, '', {headers: {"Authorization": `Bearer ${token}`}})
        .then(() => {
            axios.get(postURL, {headers: {"Authorization": `Bearer ${token}`}})
            .then((response) => {
                setPost(response.data)
                setLike(<a onClick={likeFn}>Like</a>)
            })
        })
    }

    const toggleCommentsModal = () => {
        if (!commentsModal) {
            setCommentsModal('is-active')
        } else {
            setCommentsModal(null)
        }
        
    }

  return (
    <div>
        <div>
            <Block>
            <Card>
                <CardContent>
                    <Media>
                        <MediaLeft>
                            <Image isSize='48x48' src={post.author.profile_pic} />
                        </MediaLeft>
                        <MediaContent>
                            <Title isSize={5}>{post.author.name_first} {post.author.name_last}</Title>
                            <Subtitle isSize={6}>@{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}</Subtitle>
                        </MediaContent>
                    </Media>
                    <Content>
                        {post.content}
                        <br/>
                    </Content>
                    <Content >
                        <Columns is-centered>
                            <Column hasTextAlign='left'>
                                <small>{post.likes.length} Likes</small>
                            </Column>
                            <Column hasTextAlign='right'>
                                <small>{post.comments.length} Comments</small>
                            </Column>
                        </Columns>    
                    </Content>
                </CardContent>
                <CardFooter>
                    <CardFooterItem>
                        {like}
                    </CardFooterItem>
                    <CardFooterItem>
                        <a onClick={toggleCommentsModal}>Comments</a>
                    </CardFooterItem>
                </CardFooter>
            </Card>
            </Block>
        </div>
        <div className={`modal ${commentsModal}`}>
            <div className="modal-background"></div>
                <div className="modal-content">
                    <PostComments postId={post._id} userId={userId} token={token} updatePost={updatePost}/>
                </div>
            <button onClick={toggleCommentsModal} className="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
  )
}

export default Post