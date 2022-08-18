import React, { useEffect, useState } from 'react'

import {Title, Subtitle, Content, MediaLeft, MediaContent, Image, CardContent, CardFooterItem, card, Section, Column, Columns} from 'bloomer'
import { Loader, Card, Media, Block, Button  } from 'react-bulma-components'
import { DateTime } from 'luxon'
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter'
import axios from 'axios'

function Post(props) {
    const userId = props.userId
    const token = props.token
    const [post, setPost] = useState(props.post)
    const [like, setLike] = useState()
    const postURL = `http://localhost:3000/api/posts/${post._id}`
    const likeURL = `http://localhost:3000/api/posts/${post._id}/like`
    const unlikeURL = `http://localhost:3000/api/posts/${post._id}/unlike`
    const alreadyLiked = post.likes.indexOf(userId)
    
    useEffect(() => {
        if (alreadyLiked == -1) {
            setLike(<a onClick={likeFn}>Like</a>)
        } else {
            setLike(<a onClick={unlikeFn}>Unlike</a>)
        }
    },[])
    

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

//setLike(<a onClick={likeFn}>Like</a>)

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
                        Comment
                    </CardFooterItem>
                </CardFooter>
            </Card>
            </Block>


        </div>
        
    </div>
  )
}

export default Post