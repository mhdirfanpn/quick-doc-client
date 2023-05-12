import React from "react";
import Body1 from "../../../components/user/body1/Body1";
import Navbar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";
import DoctorCards from "../../../components/user/body1/DoctorCards";
import Features from "../../../components/user/features/Features1";
import UserNav from "../../../components/user/navbar/UserNav";



function Home() {
  return (
    <>
      <UserNav/>
      <Body1/>
      <Features/>
      <DoctorCards/>  
      <Footer/>   
    </>
  );
}

export default Home;
