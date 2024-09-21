import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/VerifyEmail.css"; // Importez le fichier CSS pour le style

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmailToken = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (token) {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/verify-email?token=${token}`);
          setVerified(true);
          toast.success(response.data.msg);
        } catch (err) {
          toast.error("Verification failed");
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Invalid verification link");
        setLoading(false);
      }
    };

    verifyEmailToken();
  }, [location.search]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="verify-email-container">
      {verified ? (
        <div className="verify-email-success">
          <h2>Email successfully verified</h2>
          <button className="login-button" onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      ) : (
        <div className="verify-email-failed">
          <h2>Email verification failed</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
