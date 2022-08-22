import React, { useState } from 'react'
import {Title, Subtitle, Content, MediaLeft, Button, MediaContent, Image, CardContent, CardFooterItem, TextArea, Control, Field} from 'bloomer'
import { Loader, Card, Media, Block,   } from 'react-bulma-components'
import { DateTime } from 'luxon'
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter'
import axios from 'axios'
import Post from './Post'

function Posts(props) {
    const token = props.token
    const profilePic = localStorage.getItem('palstalkUserPic')
    const profileName = localStorage.getItem('palstalkUserName')
    const postSubmitURL = `http://localhost:3000/api/posts`
    const updatePosts = props.updatePosts

    const [newPost, setNewPost] = useState()
    //console.log(props.userId, props.token)
    if (!props.posts) {
        return(<Loader/>)
    }

    const onChange = (e) => {
        setNewPost(e.target.value)
    }


    const submitNewPost = () => {
        const postToSubmit = {
            content: newPost,
            author: props.userId
        }
        axios.post(postSubmitURL, postToSubmit, {headers: {"Authorization": `Bearer ${token}`}})
        .then(() => {
            updatePosts()
        })


    }

  return (
    <div>
            <Block>
                <Card>
                    <CardContent>
                    <Media>
                        <MediaLeft>
                            <Image isSize='64x64' src={profilePic} />
                        </MediaLeft>
                        <MediaContent>  
                            <Field>
                                <Control>
                                    <TextArea onChange={(e) => onChange(e)} value={newPost} rows='3' placeholder={'Enter your comment'} />  
                                </Control>
                            </Field>
                            <Field isGrouped='right'>
                                <Control>
                                    <small>{`Posting as ${profileName} `}</small>
                                </Control>
                                
                                <Control>
                                    <Button onClick={submitNewPost}  isColor='info'>Post</Button>
                                </Control>
                            </Field>   
                        </MediaContent>
                    </Media>
                    </CardContent>
                </Card>

                </Block>

        <div>

        {props.posts.map((post)=> {
            
        return (
            <Block key={post._id}>
                <Post post={post} token={token} userId={props.userId}/>
            </Block>
            
        )
        })}
        </div>
        
    </div>
  )
}

export default Posts

//<Post post={post}p/>