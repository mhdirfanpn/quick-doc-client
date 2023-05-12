import React from 'react'
import Messenger from '../../../components/messenger/Messenger'
import ChatNavBar from '../../../components/user/navbar/UserNav'

const UserMessage = () => {
  return (
    <>
    <ChatNavBar/>
    <Messenger isUser={true}/>    </>
  )
}

export default UserMessage