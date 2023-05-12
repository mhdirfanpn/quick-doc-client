import React from "react";
import UserSession from "../../../components/user/sessions/UserSession";
import NavBar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";
import UserNav from "../../../components/user/navbar/UserNav";

const Sessions = () => {
  return (
    <>
      <UserNav />
      <UserSession />
      <Footer />
    </>
  );
};

export default Sessions;
