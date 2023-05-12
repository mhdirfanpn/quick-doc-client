import React from 'react'
import NavBar from '../../../components/user/navbar/Navbar'
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