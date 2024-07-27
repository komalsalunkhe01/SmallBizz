import React from "react";
import Navbar from "./components/Navbar";
import Cardlist from "./components/Cardlist";

function WelcomeScreen({ userId }) {
  return (
    <>
      <Navbar userId={userId} ></Navbar>
      <Cardlist></Cardlist>
    </>
  );
}

export default WelcomeScreen;
