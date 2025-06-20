import React from "react";
import WrittingText from "../components/WrittingText";
import TeamFixture from "../components/TeamFixture";
import MatchFixture from "../components/MatchFixture";
import Highlight from "../components/Highlights";
import Sponsers from "../components/Sponsers";
import TopScorer from "../components/TopScorer";
import Banner from "../components/Banner";
const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner />
      <WrittingText />
      <TeamFixture />
      <MatchFixture />
      <Highlight />
      <Sponsers />
      <TopScorer />
    </div>
  );
};

export default Home;
