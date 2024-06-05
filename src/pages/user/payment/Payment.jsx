import React from "react";
import HandlePay from "../../../components/user/payment/HandlePay";
import Footer from "../../../components/user/footer/Footer";
import Features from "../../../components/user/features/Features1";
import UserNav from "../../../components/user/navbar/UserNav";

const Payment = () => {
  return (
    <>
      <UserNav />
      <HandlePay />
      <Features />
      <Footer />
    </>
  );
};

export default Payment;
