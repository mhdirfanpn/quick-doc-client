import React from 'react'
import Navbar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";
import UserNav from "../../../components/user/navbar/UserNav";
import ViewDoctor from '../../../components/user/DoctorDetails/ViewDoctor';
import Features2 from '../../../components/user/features/Features2';

const DoctorDetails = () => {
  return (
    <>
    <UserNav/>
    <ViewDoctor/>
    <Features2/>
    <Footer/>
    </>
  )
}

export default DoctorDetails
