import React from 'react'
import NavBar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'
import SpinnerLoader from '../../../components/spinner/SpinnerLoader'

const UserLoader = () => {
  return (
    <>
     <NavBar/>
     <SpinnerLoader/>
    <Footer/>
    </>
   
  )
}

export default UserLoader