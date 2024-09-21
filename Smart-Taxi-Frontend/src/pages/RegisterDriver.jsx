import React, { useEffect, useState } from "react";
import Image from "../assets/taxi.png";
// import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/RegisterD.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DriverSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  // useEffect(() => {
  //   const role = localStorage.getItem("role"); // Récupérer le type d'utilisateur depuis le local storage (ou autre source)
  //   if (role === "driver") {
  //     navigate("/dashboardc"); // Redirection vers le tableau de bord du client si l'utilisateur est un client
  //   }
  // }, [role, navigate]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let lastname = e.target.lastname.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let cin = e.target.cin.value;
    let taxiId = e.target.taxiid.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (
      name.length > 0 &&
      lastname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      cin.length > 0 &&
      taxiId.length > 0
    ) {
      if (!passwordRegex.test(password)) {
        toast.error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number");
        return;
      }
      if (password === confirmPassword) {
        const formData = {
          username: name + " " + lastname,
          email,
          password,
          cin, // Ajout de CIN dans l'objet formData
          taxiId,
        };
        try {
          const response = await axios.post(
            "http://localhost:5000/api/v1/registerD",
            formData
          );
          toast.success("Registration successfull");
          navigate("/login");
        } catch (err) {
          toast.error(err.message);
        }
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You already logged in");
      navigate("/dashboardc");
    }
  }, []);

  return (
    <div className="register-main">
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-center">
            <h2>Welcome to STaxi!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                required={true}
              />
              <input
                type="text"
                placeholder="Lastname"
                name="lastname"
                required={true}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                required={true}
              />
              <input type="text" placeholder="CIN" name="cin" required={true} />
              <input
                type="text"
                placeholder="Taxi ID"
                name="taxiid"
                required={true}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required={true}
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
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required={true}
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
              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
                <button type="submit">
                  <img src={GoogleSvg} alt="" />
                  Sign Up with Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverSignUp;
