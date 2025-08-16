import React from "react";
import { FaUsers } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="w-11/12 mx-auto px-6 md:px-10 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="md:w-1/2">
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase">
            Always donate for childrens
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lend a Helping Hand to Those in Need
          </h1>
          <p className="text-gray-600 mb-6">
            We help companies develop powerful corporate social responsibility,
            grantmaking, and employee engagement strategies.
          </p>
          <button className="bg-primary  text-white px-6 py-3 rounded-md font-semibold">
            Donate Now
          </button>
        </div>

        {/* Image and Visual Elements */}
        <div className="md:w-1/2 relative">
          <img
            src="./hero.png" // Placeholder image, replace with your own
            alt="Volunteers"
            className="rounded-lg w-full"
          />

          {/* Total Donation Badge */}
          <div className="absolute hidden md:block top-4 right-4 bg-white shadow-lg p-2 px-4 rounded-md flex items-center gap-2">
            <span className="text-sm font-semibold text-green-700">
              Total Donation
            </span>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full w-[65%]"></div>
            </div>
            <span className="text-sm text-gray-700 font-semibold">65%</span>
          </div>

          {/* Volunteer Badge */}
          <div className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://i.pravatar.cc/40?img=1"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://i.pravatar.cc/40?img=2"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://i.pravatar.cc/40?img=3"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://i.pravatar.cc/40?img=4"
              />
            </div>
            <span className="text-sm font-medium">+4k</span>
            <span className="text-sm text-gray-700">Join Our Volunteer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
