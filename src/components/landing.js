import React from "react";
import { Link } from "react-router-dom";
import "./cssModules.css";

const Landing = () => {
  return (
    <div className="landingButton">
      <Link to="/quiz">
        <button style={{ fontSize: "300%" }}> take quiz </button>
      </Link>
    </div>
  );
};

export default Landing;
