import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import jwtDecode from "jwt-decode";

const HandlePay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let doctorDetails = location.state.doctor;
  let time = location.state.selectedTime;
  let date = location.state.selectedDate;
  const token = localStorage.getItem("userToken");
  let userData = jwtDecode(token);
  

  let handlePayment = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "/payment/orders",
        { amount: "500" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      initPayment(result.data.data);
    } catch (err) {
      navigate('/error')
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_JfiruKTJHf8QRk",
      amount: data.amount,
      currency: data.currency,
      name: "QuickDoc.com",
      description: "Booking session",
      order_id: data.id,
      image: "",

      handler: async (response) => {
        try {
          const result = await axios.post("/payment/verify", response);
          bookSession();
          appointment();
        } catch (err) {
          navigate('/error')
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const bookSession = async () => {
    await axios
      .post(
        "/book_session",
        {
          doctorDetails,
          time,
          date,
          plan: "500",
          userData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {});
  };

  const appointment = async () => {
    await axios
      .post(
        "/appointment",
        {
          doctorDetails,
          time,
          date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        navigate("/order_success");
      });
  };

  return (
    <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto mt-24">
      <div class="flex justify-start item-start space-y-2 flex-col">
        <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Order Summary
        </h1>
      </div>
      <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div class="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Doctor Details
              </h3>
              <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div class="flex justify-between w-full">
                  <p class="text-2xl font-bold text-blue-900">
                    Dr. {doctorDetails.fullName}
                  </p>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    {doctorDetails.specialization}
                  </p>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    {doctorDetails.experience} years experience
                  </p>
                </div>
              </div>
              <p>
                {" "}
                Date - {date} <br /> Time - {time}
              </p>
            </div>
            <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                plan
              </h3>
              <h1 className="text-2xl font-bold text-blue-900">INR ₹500</h1>
              <p>
                {" "}
                Plan that fits your budget and offers the features you need.
              </p>
              <div class="flex justify-between items-start w-full"></div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            User Details
          </h3>
          <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <form action="" onSubmit={handlePayment}>
                <div class="flex justify-between items-center w-full mt-5">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    {userData.email}
                  </p>
                </div>
                <div class="flex justify-between items-center w-full mt-5">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    {userData.number}
                  </p>
                </div>
                <div class="flex w-full mt-5 justify-center items-center md:justify-start md:items-start">
                  <button
                    type="submit"
                    class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800"
                  >
                    Make Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandlePay;
