import axios from "axios";
import { baseUserUrl, baseAdminUrl, baseDoctorUrl } from "./ConstUrls";


const instance = axios.create({
  baseURL: baseUserUrl,
});

const adminInstance = axios.create({
  baseURL: baseAdminUrl,
});

const doctorInstance = axios.create({
  baseURL: baseDoctorUrl,
});


adminInstance.interceptors.request.use((config)=>{
    const adminToken=localStorage.getItem('adminToken')
    if(adminToken){
        config.headers.Authorization=`Bearer ${adminToken}`
    }
    return config
},(error)=>{
    return Promise.reject(error);
})

doctorInstance.interceptors.request.use((config)=>{
  const doctorToken=localStorage.getItem('doctorToken')
  if(doctorToken){
      config.headers.Authorization=`Bearer ${doctorToken}`
  }
  return config
},(error)=>{
  return Promise.reject(error);
})



instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.data?.userBlocked) {
      localStorage.removeItem("userToken");
    } 
    else {
      return Promise.reject(error);
    }
  }
);

export default instance;
export {adminInstance};
export {doctorInstance};
