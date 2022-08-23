import React from 'react'
import { Block } from 'react-bulma-components'
import UserCard from '../components/UserCard'

function Friends() {
  return (
    <Block display='flex' flexDirection='row'  flexWrap='wrap'>Friends
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
    </Block>
    
  )
}

export default Friends