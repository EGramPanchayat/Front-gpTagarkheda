


import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axioesInstance from "../utils/axioesInstance";

export default function RequireAuth({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    axioesInstance.get("/check")
      .then(res => setAllowed(res.data.ok))
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) return <div>Loading...</div>;
  return allowed ? children : <Navigate to="/login" replace />;
}

