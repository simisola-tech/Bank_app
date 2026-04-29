import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { useLogin } from "../Context/LoginContext";

const LandingPage = () => {
  const { user } = useLogin();

  return (
    <div>
      <Header user={user} />
      <Hero />
    </div>
  );
};

export default LandingPage;
