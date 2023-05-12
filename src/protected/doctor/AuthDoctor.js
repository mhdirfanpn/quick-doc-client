import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import { setDoctorLogin } from "../../redux/doctorSlice";

export default function AuthDoctor({ children }) {
  const token = localStorage.getItem("doctorToken");

  if (token){
    store.dispatch(
      setDoctorLogin({
        doctorToken: token,
      })
    );
    return <Navigate to={"/doctor-home"} />;
    }
    return children;
}