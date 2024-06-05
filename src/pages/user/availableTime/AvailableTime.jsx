import React from 'react'
import SelectTime from '../../../components/user/selectTime/SelectTime'
import Footer from "../../../components/user/footer/Footer";
import UserNav from "../../../components/user/navbar/UserNav";
import Features2 from '../../../components/user/features/Features2';

const AvailableTime = () => {
  return (
    <>
    <UserNav/>
    <SelectTime/>
    <Features2/>
    <Footer/>
    </>
  )
}

export default AvailableTime