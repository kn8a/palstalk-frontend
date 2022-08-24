import React from 'react'
import { Block } from 'react-bulma-components'
import UserCard from '../components/UserCard'

function Friends() {
  return (
    <div>
    <Block></Block>
    <Block display='flex' flexDirection='row' id='friends-container' flexWrap='wrap'>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
    </Block>
    </div>
    
  )
}

export default Friends