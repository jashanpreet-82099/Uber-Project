import React from "react";
import uber1 from "../assets/uber1.jpeg";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";


const Home = () => {
  return (
    <div>
      <div
        className="h-screen bg-cover bg-center pt-8 w-full flex justify-between flex-col"
        style={{ backgroundImage: `url(${uber1})` }}
      >
        <img
          className="w-50 ml-6"
          src="https://imgs.search.brave.com/GRjHPEbkAyBgc4m32QVpPBhFnBudDdRU3GHB1v6Dymw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw"
          alt=""
        />
        <div className="bg-white pb-9 py-5 px-5">
          <h2 className="text-3xl font-bold">Get Started With Uber</h2>

          <div className="flex items-center justify-center relative">
            <Link
              to="/login"
              className="w-full flex items-center justify-center bg-black text-white py-3 rounded mt-5 text-lg"
            >
              Continue
            </Link>

            <FaArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 text-white cursor-pointer mt-2 text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
