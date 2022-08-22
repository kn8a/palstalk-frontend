import React from 'react'
import {Title, Subtitle, Content, MediaLeft, MediaContent, Image, CardContent, CardFooterItem,} from 'bloomer'
import { Loader, Card, Media, Block, Button  } from 'react-bulma-components'
import { DateTime } from 'luxon'
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter'
import axios from 'axios'
import Post from './Post'

function Posts(props) {
    const token = props.token
    //console.log(props.userId, props.token)
    if (!props.posts) {
        return(<Loader/>)
    }


  return (
    <div>
        <div>

        {props.posts.map((post)=> {
            
        return (
            <Block>
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