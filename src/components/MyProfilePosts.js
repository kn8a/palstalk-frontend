import React, { useState } from 'react'
import {Title, Subtitle, Content, MediaLeft, Button, MediaContent, Image, CardContent, CardFooterItem, TextArea, Control, Field} from 'bloomer'
import { Loader, Card, Media, Block,   } from 'react-bulma-components'
import { DateTime } from 'luxon'
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter'
import axios from 'axios'
import Post from './Post'
import { toast } from 'react-toastify'
import MyProfilePost from './MyProfilePost'

function MyProfilePosts(props) {
    const token = localStorage.getItem('palstalkToken')
    const profilePic = localStorage.getItem('palstalkUserPic')
    const profileName = localStorage.getItem('palstalkUserName')
    const postSubmitURL = `http://localhost:3000/api/posts`
    const updatePosts = props.updatePosts
    //console.log(props.posts)
    const [newPost, setNewPost] = useState()
    //console.log(props.userId, props.token)
    if (!props.posts) {
        return(<Block><Loader/></Block>)
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
            toast.success('Posted')
            setNewPost('')
        })


    }

  return (
    <div>
            

        <div>

        {props.posts.map((post)=> {
            
        return (
            <Block key={post._id}>
                <MyProfilePost post={post} token={token} updatePosts={props.updatePosts} userId={props.userId}/>
            </Block>
            
        )
        })}
        </div>
        
    </div>
  )
}

export default MyProfilePosts

//<Post post={post}p/>



{/* <Block>
                <Card>
                    <CardContent><Subtitle hasTextAlign='centered'>What's on your mind?</Subtitle>
                    <Media>
                        <MediaLeft>
                            <Image isSize='64x64' src={`http://localhost:3000/api/file/${profilePic}`} />
                        </MediaLeft>
                        <MediaContent>  
                            <Field>
                                <Control>
                                    <TextArea onChange={(e) => onChange(e)} value={newPost} rows='3' placeholder={'Say something...'} />  
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

</Block> */}