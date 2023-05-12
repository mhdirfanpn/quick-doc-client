import React from "react";
import UsersList from "../../../components/admin/usersList/UsersList";
import Layout from "../../../components/admin/layout/Layout";

const UserManage = () => {
  return (
    <>
      <Layout>
        <UsersList />
      </Layout>
    </>
  );
};

export default UserManage;
