import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg.png";

function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Welcome to My Web Application
        </h1>

        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
