import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../redux/userSlice";
import Swal from "sweetalert2";

export default function ChatNavBar() {
  const [navbar, setNavbar] = useState(false);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        dispatch(setLogout());
        navigate("/");
      }
    });
  };

  return (
    <nav
      className="w-full bg-white shadow"
      style={{
        backgroundColor: "#4851b0",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      }}
    >
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <p
              className="text-2xl text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Quick-Doc
            </p>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="flex items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {token ? (
                <>
                  <li className="text-white cursor-pointer">
                    <p onClick={() => navigate("/user-messenger")}>Chat</p>
                  </li>
                  <li className="text-white cursor-pointer">
                    <p onClick={() => navigate("/userSessions")}>Appointment</p>
                  </li>
                  <li className="text-white cursor-pointer">
                    <p onClick={() => navigate("/profile")}>Profile</p>
                  </li>
                  <li className="text-white text-right">
                    <button
                      onClick={handleLogout}
                      className="bg-transparent text-white font-bold uppercase py-2 px-4 border border-white hover:bg-white hover:text-green-600 rounded transition duration-500 ease-in-out"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="text-white text-right">
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-transparent text-white font-bold uppercase py-2 px-4 border border-white hover:bg-white hover:text-green-600 rounded transition duration-500 ease-in-out"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
