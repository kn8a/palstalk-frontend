import axios from 'axios'
import { Button } from 'bloomer/lib/elements/Button'
import React, { useEffect, useState } from 'react'
import { Block, Columns, Image, Heading, Container, Tabs } from 'react-bulma-components'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import UserFriendCard from '../components/userPageComponents/UserFriendCard'
import UserPosts from '../components/userPageComponents/UserPosts'



function UserPage(props) {

    const token = localStorage.getItem('palstalkToken')
    const params = useParams()
    const userURL = `http://localhost:3000/api/users/${params.userId}`
    const [user, setUser] = useState({friends:[]})
    const [friend, setFried] = useState()
    const [content,setContent] = useState()

        
    useEffect(()=>{
        axios.get(userURL, {headers: {"Authorization": `Bearer ${token}`}})
        .then((response) => {
            setUser(response.data.user)
            setFried(response.data.friend)
        })
    }, [params])

    useEffect(()=>{
        if (!user) {
            setContent(<Loader/>)
        }
        if (friend) {
            setContent(
                <div>
                    <Block></Block>
                    <Columns>
                        <Columns.Column size={4} display={'flex'} justifyContent='center' alignItems='center' flexDirection='column'>
                            <Image size={128} src={`http://localhost:3000/api/file/${user.profile_pic}`}></Image>
                            <Block></Block>
                            <Heading textAlign={'center'} alignItems={'flex-end'}>{`${user.name_first} ${user.name_last}`}</Heading>

                        </Columns.Column>
                                <div className="vertLine">
                                
                                </div>

                        <Columns.Column display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
                            <Heading subtitle size={5}>About {user.name_first}</Heading>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {user.bio}
                            </div>
                        </Columns.Column>
                            
                    </Columns>
                    <Tabs></Tabs>
                    <Container textAlign={'center'}><Heading subtitle size={5}>{`${user.name_first}'s posts`}</Heading></Container>
                    <Container>
                        <Block></Block>
                        <UserPosts posts={user.posts}></UserPosts>
                    </Container>
                </div>
            )
        } else {
            console.log(user)
            setContent(
                <div>
                    <Block></Block>
                    <Columns>
                        <Columns.Column size={4} display={'flex'} justifyContent='center' alignItems='center' flexDirection='column'>
                            <Image size={128} src={`http://localhost:3000/api/file/${user.profile_pic}`}></Image>
                            <Block></Block>
                            <Heading textAlign={'center'} alignItems={'flex-end'}>{`${user.name_first} ${user.name_last}`}</Heading>
                        </Columns.Column>
                        <Columns.Column display='flex' justifyContent='center' alignItems='end'>
                            <Button>Add friend</Button>
                        </Columns.Column>   
                    </Columns>
                    <Tabs></Tabs>
                    <Container textAlign={'center'}><Heading subtitle size={5}>{`${user.name_first}'s friends`}</Heading></Container>
                        <Block></Block>
                        <Block display='flex' className='friends-container' flexWrap='wrap' justifyContent='space-evenly'>
                            {user.friends.map((friend) => {
                                return <div key={friend._id} ><UserFriendCard friend={friend}></UserFriendCard></div>
                            })}
                        </Block>
                </div>
              )
        }
    }, [friend])

    

return (<div>{content}</div>)
  
}

export default UserPage