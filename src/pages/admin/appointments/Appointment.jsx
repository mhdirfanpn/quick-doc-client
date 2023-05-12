import React from "react";
import AppointmentList from "../../../components/admin/appointmentList/AppointmentList";
import Layout from "../../../components/admin/layout/Layout";

const Appointment = () => {
  return (
    <>
      <Layout>
        <AppointmentList />
      </Layout>
    </>
  );
};

export default Appointment;
