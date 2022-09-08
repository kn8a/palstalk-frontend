import React, { useEffect, useState } from 'react'
import { Card, Media, Block, Content, Image, Heading, Loader} from 'react-bulma-components'
import { DateTime } from 'luxon'
import axios from 'axios'
import PostComments from './PostComments'

import {FaCommentAlt, FaThumbsDown, FaThumbsUp, } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Post(props) {
    //Props
    const userId = props.userId
    const token = props.token

    //states
    const [post, setPost] = useState(props.post)
    const [like, setLike] = useState()
    const [commentsModal, setCommentsModal] = useState('')
    

    //API URLS
    const postURL = `${process.env.REACT_APP_API_URL}/posts/${post._id}`
    const likeURL = `${process.env.REACT_APP_API_URL}/posts/${post._id}/like`
    const unlikeURL = `${process.env.REACT_APP_API_URL}/posts/${post._id}/unlike`
    
    //check if user liked current post
    const alreadyLiked = post.likes.indexOf(userId)
    useEffect(() => {
        if (alreadyLiked == -1) {
            setLike(<a onClick={likeFn}><FaThumbsUp/> Like</a>)
        } else {
            setLike(<a onClick={unlikeFn}><FaThumbsDown/> Unlike</a>)
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
        setLike(<Loader/>)
        axios.put(likeURL, '', {headers: {"Authorization": `Bearer ${token}`}})
        .then(() => {
            axios.get(postURL, {headers: {"Authorization": `Bearer ${token}`}})
            .then((response) => {
                setPost(response.data)
                setLike(<a onClick={unlikeFn}><FaThumbsDown/> Unlike</a>)
            })
        })
    }

    //unlike and switch unlike to like after click
    const unlikeFn = () => {
        setLike(<Loader/>)
        axios.put(unlikeURL, '', {headers: {"Authorization": `Bearer ${token}`}})
        .then(() => {
            axios.get(postURL, {headers: {"Authorization": `Bearer ${token}`}})
            .then((response) => {
                setPost(response.data)
                setLike(<a onClick={likeFn}><FaThumbsUp/> Like</a>)
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
                <Card.Content>
                    <Media>
                        <Media.Item align="left">
                            <Link to={`/users/${post.author._id}`}>
                            <Image size={48} src={`${process.env.REACT_APP_API_URL}/file/${post.author.profile_pic}`} />
                            </Link>
                        </Media.Item>
                        <Media.Item align="center">
                            <Link to={`/users/${post.author._id}`}>
                            <Heading size={5}>{post.author.name_first} {post.author.name_last}</Heading>
                            </Link>
                            <Heading subtitle size={6}>@{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}</Heading>
                        </Media.Item>
                    </Media>
                    <Content>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {post.content}
                        </div>
                    </Content>
                    <Content display='flex' justifyContent='space-between'>
                        <small>{post.likes.length} Likes</small>
                        <small>{post.comments.length} Comments</small>
                           
                    </Content>
                </Card.Content>
                <Card.Footer>
                    <Card.Footer.Item>
                        {like}
                    </Card.Footer.Item>
                    <Card.Footer.Item>
                        <a onClick={toggleCommentsModal}><FaCommentAlt/> Comments</a>
                    </Card.Footer.Item>
                </Card.Footer>
            </Card>
            </Block>
        </div>
        <div className={`modal ${commentsModal}`}>
            <div className="modal-background" onClick={toggleCommentsModal}></div>
                <div className="modal-content">
                    <PostComments postId={post._id} userId={userId} token={token} updatePost={updatePost}/>
                </div>
            <button onClick={toggleCommentsModal} className="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
  )
}

export default Post