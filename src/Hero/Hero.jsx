import React from 'react';
import "../Style/App.css";
import HeroImage from "../asset/HeroImage/HeroImage.png";

function Hero() {
  return (
    <div style={{ marginTop: "8%" }} className="flex flex-col lg:flex-row items-center justify-between w-11/12 mx-auto space-y-10 lg:space-y-0 lg:space-x-10">
      <div className="text-left lg:w-1/2">
        <h1 className="text-5xl font-bold mb-4">CCC. is the proven content writing service provider to outsource</h1>
        <h2 className="text-2xl font-semibold mb-4">
          Textbroker is the proven content writing service provider to outsource your written content quickly and easily.
        </h2>
        <p className="text-lg mb-6">
          Textbroker is the proven content writing service provider to outsource your written content quickly and easily. Always get the exact content you need. Textbroker is the proven content writing service provider to outsource your written content quickly.
        </p>
        <div className="flex justify-start gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
            Get Started
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200">
            Learn More
          </button>
        </div>
      </div>
      <div className="lg:w-1/2">
        <img src={HeroImage} alt="Hero" className="w-full" />
      </div>
    </div>
  );
}

export default Hero;
