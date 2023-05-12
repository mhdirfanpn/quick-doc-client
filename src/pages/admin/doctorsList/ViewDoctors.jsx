import React from "react";
import DoctorsList from "../../../components/admin/doctorsList/DoctorsList";
import Layout from "../../../components/admin/layout/Layout";

const ViewDoctors = () => {
  return (
    <>
      <Layout>
        <DoctorsList />
      </Layout>
    </>
  );
};

export default ViewDoctors;
