// import React, { useEffect, useState } from "react";
// import "../styles/Dashboard.css";
// import { Link, useNavigate } from "react-router-dom";
// import taxiImage from "../assets/taxi.png";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Dashboard = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };
//   const [token, setToken] = useState(
//     JSON.parse(localStorage.getItem("auth")) || ""
//   );
//   const [data, setData] = useState({});
//   const navigate = useNavigate();

//   const fetchLuckyNumber = async () => {
//     let axiosConfig = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/v1/dashboard",
//         axiosConfig
//       );
//       setData({ msg: response.data.msg, luckyNumber: response.data.secret });
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchLuckyNumber();
//     if (token === "") {
//       navigate("/login");
//       toast.warn("Please login first to access dashboard");
//     }
//   }, [token]);

//   return (
//     <div>
//       <header className="bg-yellow-300 text-gray-600 body-font">
//         <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
//           <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
//               viewBox="0 0 24 24"
//             >
//               <image x="0" y="0" width="23" height="22" xlinkHref={taxiImage} />
//             </svg>
//             <span className="ml-3 text-xl">STaxi</span>
//           </a>
//           <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
//             <a className="mr-5 hover:text-gray-900" href="services.html">
//               Nos services
//             </a>
//             <a className="mr-5 hover:text-gray-900" href="passager.html">
//               Déplacez-vous
//             </a>
//             <a className="mr-5 hover:text-gray-900" href="chauffeur.html">
//               Conduire
//             </a>
//             <a className="mr-5 hover:text-gray-900" href="contact.html">
//               Contact
//             </a>
//           </nav>
//           <div className="relative">
//             <button
//               onClick={toggleDropdown}
//               className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-6"
//             >
//               SignUp
//               <svg
//                 fill="none"
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 className="w-4 h-4 ml-1"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M5 12h14M12 5l7 7-7 7"></path>
//               </svg>
//             </button>
//             {dropdownVisible && (
//               <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg">
//                 <ul>
//                   <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                     <Link to="/register"> Client </Link>
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                     <Link to="/registerdriver">Driver</Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//             <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-6">
//               <Link to="/login">Login </Link>
//             </button>
//             <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
//               <Link to="/logout">Logout</Link>
//             </button>
//           </div>
//         </div>
//       </header>
//       <p>Hi CLIENT !</p>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import taxiImage from "../assets/taxi.png";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchLuckyNumber = async () => {
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/dashboard",
        axiosConfig
      );
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLuckyNumber();
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  return (
    <div>
      <header className="bg-yellow-300 text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <image x="0" y="0" width="23" height="22" xlinkHref={taxiImage} />
            </svg>
            <span className="ml-3 text-xl">STaxi</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900" href="services.html">
              Nos services
            </a>
            <a className="mr-5 hover:text-gray-900" href="passager.html">
              Déplacez-vous
            </a>
            <a className="mr-5 hover:text-gray-900" href="chauffeur.html">
              Conduire
            </a>
            <a className="mr-5 hover:text-gray-900" href="contact.html">
              Contact
            </a>
          </nav>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-6"
            >
              SignUp
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
            {dropdownVisible && (
              <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <Link to="/register"> Client </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <Link to="/registerdriver">Driver</Link>
                  </li>
                </ul>
              </div>
            )}
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-6">
              <Link to="/login">Login </Link>
            </button>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              <Link to="/logout">Logout</Link>
            </button>
          </div>
        </div>
      </header>
      <p>Hi CLIENT !</p>
    </div>
  );
};

export default Dashboard;
