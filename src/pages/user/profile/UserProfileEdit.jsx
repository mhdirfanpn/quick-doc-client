import React from "react";
import NavBar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";
import UpdateProperty from "../../../components/user/profile/UpdateUserProfile";
import UserNav from "../../../components/user/navbar/UserNav";

const UserProfileEdit = () => {
  return (
    <>
      <UserNav />
      <UpdateProperty/>
      <Footer />
    </>
  );
};

export default UserProfileEdit;
