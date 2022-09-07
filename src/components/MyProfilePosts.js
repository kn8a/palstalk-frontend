import React from 'react'
import { Loader,  Block,   } from 'react-bulma-components'

import MyProfilePost from './MyProfilePost'

function MyProfilePosts(props) {
    const token = localStorage.getItem('palstalkToken')
    
    
    if (!props.posts) {
        return(<Block><Loader/></Block>)
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