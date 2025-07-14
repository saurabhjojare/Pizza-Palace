import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container text-center mt-3">
        <p>&copy; {currentYear} Pizza Palace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
