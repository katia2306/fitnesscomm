import React from "react";
import Helmet from "react-helmet";
import Exercise from "../Exercise";

const Home = () => {
  return (
    <div>
      <Helmet title="Fitnesscomm" />
      <Exercise />
    </div>
  );
};

export default Home;
