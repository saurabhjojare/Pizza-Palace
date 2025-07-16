import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.45) 0px -25px 20px -20px",
      }}
    >
      <div className="container text-center mt-3">
        <p>&copy; {currentYear} Galaxon. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
