import React from "react";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Context/LoginContext";

const Header = () => {
  const nav = useNavigate();
  const { user } = useLogin();

  return (
    <header className="HeaderContainer">
      <section className="HeaderHolder">
        <div className="left">
          <h2>The Curve Bank</h2>
        </div>

        <div className="right">
          <p>{user?.name}</p>
          <button onClick={() => nav("/")} className="header_login_btn">
            Logout
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
