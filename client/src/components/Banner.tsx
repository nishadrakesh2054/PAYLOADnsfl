import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/compVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-black/10 to-black/40 z-10" />

      {/* Centered Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-2xl leading-tight  px-4 text-shadow-lg"
        >
          8 Schools. 1 League.
          <br />
          Every Dream Counts.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-md md:text-lg max-w-2xl mb-6"
        >
          For the first time in Nepal, schools compete in a national league
          built to discover rising stars and shape tomorrow’s champions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button
            title="Join the League"
            onClick={() => navigate("/register")}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
