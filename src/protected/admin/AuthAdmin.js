import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import { setAdminLogin } from "../../redux/adminSlice";

export default function AuthAdmin({ children }) {
  const token = localStorage.getItem("adminToken");
  if (token){
    store.dispatch(
      setAdminLogin({
        adminToken: token,
      })
    );
    return <Navigate to={"/dashboard"} />;
  } 

  return children;
}
