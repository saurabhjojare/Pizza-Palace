import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/pizza");
  }, [navigate]);

  return null;
};

export default AdminPage;
