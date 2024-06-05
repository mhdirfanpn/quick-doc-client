import React from 'react'
import Footer from '../../../components/user/footer/Footer'
import UserProfileCard from '../../../components/user/profile/userProfileCard'
import UserNav from '../../../components/user/navbar/UserNav'

const UserProfile = () => {
  return (
    <>
    <UserNav/>
    <UserProfileCard/>
    <Footer/>
    </>
  )
}

export default UserProfile