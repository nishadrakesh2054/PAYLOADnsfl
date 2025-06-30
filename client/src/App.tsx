import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamPlayers from "./pages/TeamPlayers";
import PlayerDetails from "./pages/PlayerDetails";
import Fixture from "./pages/Fixture";
import Table from "./pages/Table";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MainHighlights from "./pages/MainHighlights";
import Privacy from "./pages/Privacy";
import LiveMatchList from "./pages/LiveMatchList";
import SponserForm from "./components/SponserForm";
import NewsDetails from "./pages/NewsDetails";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
// import ScrollToTop from "./components/ScrollToTop";
import Scroll from "./components/Scroll";
import Header from "./components/Header";
import FixtureDetails from "./pages/FixtureDetails";
import Results from "./pages/Results";
function App() {
  //   const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    // const loaderTimeout = setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);

    return () => {
      //   clearTimeout(loaderTimeout);
      AOS.refresh();
    };
  }, []);
  return (
    <>
      {/* {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <img src="/initialLoaderimg.gif" alt="Loading..." />
        </div>
      ) : ( */}
      <Router>
        <Scroll />
        <div className="min-h-screen bg-gray-100">
          <Header />

          <main className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/teams/:id" element={<TeamPlayers />} />
              <Route
                path="/teams/:teamId/players/:playerId"
                element={<PlayerDetails />}
              />
              <Route path="/fixture" element={<Fixture />} />
              <Route path="/fixture/:id" element={<FixtureDetails />} />
              <Route path="/table" element={<Table />} />
              <Route path="/results" element={<Results />} />
              <Route path="/blogs" element={<News />} />
              <Route path="/blogs/:id" element={<NewsDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/highlights" element={<MainHighlights />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/live-match" element={<LiveMatchList />} />
              <Route path="/sponsers" element={<SponserForm />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        {/* <ScrollToTop /> */}
      </Router>
      {/* )} */}
    </>
  );
}

export default App;
