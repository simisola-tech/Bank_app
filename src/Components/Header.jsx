import React from "react";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();

  return (
    <header className=" HeaderContainer">
      <section className="HeaderHolder">
        <div className="left">
          <h2>The Curve Bank</h2>
        </div>
        <div className="right">
          <p>John Doe</p>

          <button onClick={() => nav("/")} className="header_login_btn">
            Logout
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
