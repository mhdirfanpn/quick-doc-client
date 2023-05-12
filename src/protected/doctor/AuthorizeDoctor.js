import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import { setDoctorLogin } from "../../redux/doctorSlice";

export default function AuthorizeDoctor({ children }) {
  const token = localStorage.getItem("doctorToken");

  if (token) {
    store.dispatch(
      setDoctorLogin({
        doctorToken: token,
      })
    );
    return children;
  }
  return <Navigate to={"/doctor-login"} />;
}
