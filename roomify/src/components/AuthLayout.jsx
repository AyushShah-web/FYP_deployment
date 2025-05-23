import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authenticationStatus = useSelector((state) => state.user.user);

  useEffect(() => {
    if (authentication && authenticationStatus != authentication) {
      navigate("/login");
    } else if (!authentication && authenticationStatus != authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authentication, navigate, authenticationStatus]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}