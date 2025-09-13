import React from "react";
import { Button } from "../ui/button";
import BgGradient from "../base/bg-gradient";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-8 px-4">
      <BgGradient/>
      <div className="container mx-auto max-w-4xl text-center">
        {/* Tagline Badge */}
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Create your social health care network
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#0331b5] mb-8 leading-tight">
          Get Smart With
          <br />
          Your{" "}
          <span className="relative inline-block p-2">
            <span className="relative z-10">Health</span>
            <span className="absolute inset-0 bg-blue-200 transform -skew-y-1 -rotate-1 rounded-lg "></span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-xl mb-10">
          Create your social health care network
        </p>

        {/* CTA Button */}
        <Button className="cursor-pointer bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 hover:from-yellow-400 hover:via-yellow-500 hover:to-orange-500 text-blue-900 font-bold px-10 py-8 text-lg rounded-xl mb-12 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-yellow-300 hover:border-yellow-400">
          Create your health file
        </Button>

        {/* Trust Badges */}
        <div className="flex justify-center items-center mt-2">
          {/* Secure Storage Badge */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#0331b5] rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-xs text-center">
              <div className="font-semibold text-[#0331b5]">
                SECURE STORAGE ASSURED
              </div>
              <div className="text-gray-500">DIGITAL MISSION</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
