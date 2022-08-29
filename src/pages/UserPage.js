import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Block, Columns, Image, Heading, Container, Section } from 'react-bulma-components'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import UserFriendCard from '../components/userPageComponents/UserFriendCard'



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
                        <Columns.Column size={4}>
                            <Image src={user.profile_pic}></Image>
                            <Block></Block>
                            <Heading textAlign={'center'} alignItems={'flex-end'}>{`${user.name_first} ${user.name_last}`}</Heading>
    
                        </Columns.Column>
    
                        <Columns.Column justifyContent='end' alignItems='end'>
                            
                        </Columns.Column>
                            
                    </Columns>


                    
                    
                    <Block></Block>
                    

                </div>
            )
        } else {
            console.log(user)
            setContent(
                <div>

                    <Block></Block>
                    <Columns>
                        <Columns.Column size={4}>
                            <Image src={user.profile_pic}></Image>
                            <Block></Block>
                            <Heading textAlign={'center'} alignItems={'flex-end'}>{`${user.name_first} ${user.name_last}`}</Heading>
    
                        </Columns.Column>
    
                        <Columns.Column justifyContent='end' alignItems='end'>
                            
                        </Columns.Column>
                            
                    </Columns>
                    
                    
                </div>
              )
        }
    }, [friend])

    

return (<div>{content}</div>)
  
}

export default UserPage