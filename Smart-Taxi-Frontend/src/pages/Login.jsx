// import React, { useEffect, useState } from "react";
// import Image from "../assets/image.png";
// import Logo from "../assets/logo.png";
// import GoogleSvg from "../assets/icons8-google.svg";
// import { FaEye } from "react-icons/fa6";
// import { FaEyeSlash } from "react-icons/fa6";
// import "../styles/Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [token, setToken] = useState(
//     JSON.parse(localStorage.getItem("auth")) || ""
//   );
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     let email = e.target.email.value;
//     let password = e.target.password.value;

//     if (email.length > 0 && password.length > 0) {
//       const formData = {
//         email,
//         password,
//       };
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/api/v1/login",
//           formData
//         );
//         const { token, role } = response.data;

//         localStorage.setItem("auth", JSON.stringify(token));
//         toast.success("Login successful");

//         if (role === "driver") {
//           localStorage.setItem("role", "driver");
//           navigate("/taxi"); //dashboardc
//         } else {
//           localStorage.setItem("role", "client");
//           navigate("/client"); //dashboard
//         }
//       } catch (err) {
//         console.log(err);
//         toast.error(err.message);
//       }
//     } else {
//       toast.error("Please fill all inputs");
//     }
//   };

//   useEffect(() => {
//     if (token !== "") {
//       toast.success("You already logged in");
//       navigate("/dashboard");
//     }
//   }, []);

//   return (
//     <div className="login-main">
//       <div className="login-right">
//         <div className="login-right-container">
//           <div className="login-center">
//             <h2>Welcome back!</h2>
//             <p>Please enter your your email and password</p>
//             <form onSubmit={handleLoginSubmit}>
//               <input type="email" placeholder="Email" name="email" />
//               <div className="pass-input-div">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   name="password"
//                 />
//                 {showPassword ? (
//                   <FaEyeSlash
//                     onClick={() => {
//                       setShowPassword(!showPassword);
//                     }}
//                   />
//                 ) : (
//                   <FaEye
//                     onClick={() => {
//                       setShowPassword(!showPassword);
//                     }}
//                   />
//                 )}
//               </div>

//               <div className="login-center-options">
//                 <div className="remember-div">
//                   <input type="checkbox" id="remember-checkbox" />
//                   <label htmlFor="remember-checkbox">
//                     Remember for 30 days
//                   </label>
//                 </div>
//                 <a href="#" className="forgot-pass-link">
//                   Forgot password?
//                 </a>
//               </div>
//               <div className="login-center-buttons">
//                 <button type="submit">Log In</button>
//                 <button type="submit">
//                   <img src={GoogleSvg} alt="" />
//                   Log In with Google
//                 </button>
//               </div>
//             </form>
//           </div>

//           <p className="login-bottom-p">
//             Don't have an account? <Link to="/register">Sign Up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/login",
          formData
        );
        const { token, role } = response.data;

        localStorage.setItem("auth", JSON.stringify(token));
        localStorage.setItem("role", role);
        toast.success("Login successful");

        if (role === "driver") {
          navigate("/taxi"); //dashboard
        } else {
          navigate("/client"); //dashboard
        }
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You already logged in");
      if (role === "driver") {
        navigate("/taxi"); //dashboard
      } else if (role === "client") {
        navigate("/client"); //dashboard
      } else {
        // Handle the case when the role is not set
        // You might want to redirect to a default page or show an error message
      }
    }
  }, [token, role]);

  return (
    <div className="login-main">
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your your email and password</p>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
