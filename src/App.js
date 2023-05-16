import './App.css'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AuthUser from './protected/user/AuthUser'
import AuthorizeUser from './protected/user/AuthorizeUser'
import AuthDoctor from './protected/doctor/AuthDoctor'
import AuthorizeDoctor from './protected/doctor/AuthorizeDoctor'
import AuthAdmin from './protected/admin/AuthAdmin'
import AuthorizeAdmin from './protected/admin/AuthorizeAdmin'
import SpinnerLoader from './components/spinner/SpinnerLoader'
import ScrollToTop from './scrollTop/ScrollTop'

import Home from './pages/user/home/Home'
import DoctorHome from './pages/doctor/home/DoctorHome'
import AdminHome from './pages/admin/home/AdminHome'
import UserManage from './pages/admin/usersList/UserManage'

import AdminLogin from './pages/admin/login/AdminLogin'
import DoctorLogin from './pages/doctor/login/DoctorLogin'
import Login from './pages/user/login/Login'
import RoomPage from './pages/room'
import DoctorRegister from './pages/doctor/register/DoctorRegister'

import Dashboard from './pages/admin/dashboard/Dashboard'

const Banner = lazy(()=>import('./pages/admin/banner/Banner'))
const Register = lazy(()=>import('./pages/user/register/Register'))
const OtpLogin = lazy(()=>import('./pages/user/login/OtpLogin'))
const ViewDoctors = lazy(()=>import('./pages/admin/doctorsList/ViewDoctors'))
const ManageDoctors = lazy(()=>import('./pages/admin/doctorsRequest/ManageDoctors'))
const UserMessage = lazy(()=>import('./pages/user/userMessage/UserMessage'))
const AvailableTime  = lazy(()=>import('./pages/user/availableTime/AvailableTime' ))
const DoctorDetails = lazy(()=>import('./pages/user/doctorDetails/DoctorDetails'))
const DoctorCard = lazy(()=>import('./pages/admin/doctorDetails/DoctorDetails'))
const UserProfileEdit = lazy(()=>import('./pages/user/profile/UserProfileEdit'))
const UserProfile = lazy(()=>import('./pages/user/profile/UserProfile'))
const DocMessage = lazy(()=>import('./pages/doctor/doctorMessage/DocMessage'))
const DoctorProfile = lazy(()=>import('./pages/doctor/profile/DoctorProfile'))
const ScheduleAppointment = lazy(()=>import('./pages/doctor/ScheduleTime/ScheduleAppointment'))
const Sessions = lazy(()=>import('./pages/user/sessions/Sessions'))
const Appointment = lazy(()=>import('./pages/admin/appointments/Appointment'))
const DoctorAppointment = lazy(()=>import('./pages/doctor/appointment/DoctorAppointment')) 
const Payment = lazy(()=>import('./pages/user/payment/Payment'))
const OrderSuccess = lazy(()=>import('./pages/user/orderSuccess/OrderSuccess'))




const App = () => {


  const {loading} = useSelector(state => state.spinner)
  
  return (
    <div> 
       <BrowserRouter>

       <ScrollToTop>

        {loading ? <SpinnerLoader/> : 


       <Routes>

  {/* ========================================USER ROUTES============================================================= */}        

          <Route path='/' element={
            <AuthUser>
              <Home/>
            </AuthUser>
          }/>

         <Route path='/login' element={
            <AuthUser>
              <Login/>
            </AuthUser>
          }/>


         <Route path='/room/:roomId' element={
                 <RoomPage/>
          }/>



          <Route path='/otp' element={
            <AuthUser>
               <Suspense fallback={<SpinnerLoader/>}>
              <OtpLogin/>
              </Suspense>
            </AuthUser>
          }/>

          <Route path='/signUp' element={
            <AuthUser>
                <Suspense fallback={<SpinnerLoader/>}>
              <Register/>
              </Suspense>
            </AuthUser>
          }/>   

          <Route path='/home' element={
            <AuthorizeUser>
              <Home/>
            </AuthorizeUser>
          }/>

          <Route path='/profile' element={
            <AuthorizeUser>
                <Suspense fallback={<SpinnerLoader/>}>
              <UserProfile/>
              </Suspense>    
            </AuthorizeUser>
          }/>

          <Route path='/profile/edit' element={
            <AuthorizeUser>
             <Suspense fallback={<SpinnerLoader/>}>
              <UserProfileEdit/>
              </Suspense>
            </AuthorizeUser>
          }/>

          <Route path='/doctorDetails/:doctorId' element={
              <Suspense fallback={<SpinnerLoader/>}>
              <DoctorDetails/>
              </Suspense> 
          }/>

          <Route path='/checkAvailability/:doctorId' element={
            <AuthorizeUser>
<Suspense fallback={<SpinnerLoader/>}>
                <AvailableTime/>
                </Suspense>
            </AuthorizeUser>
          }/>

          <Route path='/handlePay' element={
            <AuthorizeUser>
              <Suspense fallback={<SpinnerLoader/>}>
              <Payment/>
              </Suspense>
            </AuthorizeUser>
          }/>

          <Route path='/order_success' element={
            <AuthorizeUser>
              <OrderSuccess/>
            </AuthorizeUser>
          }/>

          <Route path='/userSessions' element={
            <AuthorizeUser>
              <Suspense fallback={<SpinnerLoader/>}>
              <Sessions/>
              </Suspense>         
            </AuthorizeUser>
          }/>

          <Route path='/user-messenger' element={
            <AuthorizeUser>
              <Suspense fallback={<SpinnerLoader/>}>
              <UserMessage/>
              </Suspense>
            </AuthorizeUser>
          }/>


  {/* ========================================DOCTOR ROUTES============================================================= */}

        <Route path='/doctor-login' element={
            <AuthDoctor>
             <DoctorLogin />
            </AuthDoctor>
          } />

           
        <Route path='/doctor-register' element={
            <AuthDoctor>
              <DoctorRegister />
            </AuthDoctor>
          } />

          <Route path='/doctor-home' element={
            <AuthorizeDoctor>
              <DoctorHome /> 
            </AuthorizeDoctor>
          } />


          <Route path='/doctor-profile' element={
            <AuthorizeDoctor>
              <Suspense fallback={<SpinnerLoader/>}>
              <DoctorProfile /> 
              </Suspense>
            </AuthorizeDoctor>
          } />

          <Route path='/setTime' element={
            <AuthorizeDoctor>
                 <Suspense fallback={<SpinnerLoader/>}>
               <ScheduleAppointment /> 
               </Suspense>
            </AuthorizeDoctor>
          } />

          <Route path='/doctor-appointment' element={
            <AuthorizeDoctor>
                 <Suspense fallback={<SpinnerLoader/>}>
              <DoctorAppointment /> 
              </Suspense>
            </AuthorizeDoctor>
          } />

          <Route path='/doctor-messenger' element={
            <AuthorizeDoctor>
                <Suspense fallback={<SpinnerLoader/>}>
              <DocMessage /> 
              </Suspense>
            </AuthorizeDoctor>
          } />


  {/* ========================================ADMIN ROUTES============================================================= */}         
         
          <Route path='/admin' element={
            <AuthAdmin>
              <AdminLogin />
            </AuthAdmin>
          } />

          <Route path='/dashboard' element={
          <AuthorizeAdmin>
            <Dashboard />
          </AuthorizeAdmin>
          } />

          <Route path='/banner' element={
          <AuthorizeAdmin>
             <Suspense fallback={<SpinnerLoader/>}>
            <Banner />
            </Suspense>
          </AuthorizeAdmin>
          } />

          <Route path='/admin-home' element={
            <AuthorizeAdmin>
              <AdminHome />
            </AuthorizeAdmin>
          } />

          <Route path='/users-list' element={
            <AuthorizeAdmin>
              <UserManage />
            </AuthorizeAdmin>
          } />


          <Route path='/doctors-list' element={
            <AuthorizeAdmin>
           <Suspense fallback={<SpinnerLoader/>}>
              <ViewDoctors />
              </Suspense>
            </AuthorizeAdmin>
          } />

          <Route path='/manage-doctors' element={
            <AuthorizeAdmin>
           <Suspense fallback={<SpinnerLoader/>}>
              <ManageDoctors />
              </Suspense>
            </AuthorizeAdmin>
          } />

          <Route path='/doctor-card/:doctorId' element={
            <AuthorizeAdmin>
             <Suspense fallback={<SpinnerLoader/>}>
              <DoctorCard />
              </Suspense>
            </AuthorizeAdmin>
          } />

          <Route path='/appointment' element={
            <AuthorizeAdmin>
             <Suspense fallback={<SpinnerLoader/>}>
              <Appointment />
              </Suspense>
            </AuthorizeAdmin>
          } />

          
       </Routes>


        }

      </ScrollToTop>

       </BrowserRouter>
    </div>
  )
}

export default App
