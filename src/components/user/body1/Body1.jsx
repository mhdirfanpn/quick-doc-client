import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { GET_BANNER } from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";
import "./Body1.css";


const Body1 = () => {

  const [banner, setBanner] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await axios.get(GET_BANNER)
        setBanner(response.data)
      } catch (error) {
        navigate('/error')
      }
    }

    getBanner()
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <div className="w-full mt-44 bg-white flex flex-col justify-between">
        <div className="grid md:grid-cols-2 max-w-[1450px] m-auto">
          <div className=" flex flex-col justify-center md:items-start w-full py-8 my-div mt-8">
            <h1 className="doc py-3 text-5xl md:text-7xl font-bold">
              QUICK-DOC
            </h1>
            <p className="text-4xl mt-5 font-semibold text-gray-700">
              {/* Our specialist doctors are ready to help you, Hassle-free virtual
              care */}
              {banner?.description}
            </p>
          </div>

          <div>
            <img
              className="w-11/12"
              src={banner?.bannerPic}
              alt="banner pic"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Body1;
