import React from "react";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Context/LoginContext";

const Header = () => {
  const { user, logout } = useLogin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="HeaderContainer">
      <section className="HeaderHolder">
        <div className="left">
          <h2>The Curve Bank</h2>
        </div>

        <div className="right">
          <p>{user?.name}</p>
          <button onClick={handleLogout} className="header_login_btn">
            Logout
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
