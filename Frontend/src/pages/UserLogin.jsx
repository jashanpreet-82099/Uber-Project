import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [userData, setUserData] = useState({})


  const sumitHandler = (e) => {
    e.preventDefault();

    setUserData({
      email: email,
      password: password
    })

    console.log(userData)

    setEmail("");
    setPassword("");
  };

  
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <div className="-ml-5 mb-6">
          <img
            className="w-50"
            src="https://imgs.search.brave.com/GRjHPEbkAyBgc4m32QVpPBhFnBudDdRU3GHB1v6Dymw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw"
            alt=""
          />
        </div>

        <form onSubmit={(e) => sumitHandler(e)}>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#f5f5f5] rounded-lg px-4 outline-none py-3 w-full text-lg mb-4 border border-transparent focus:border-black focus:bg-white transition-all"
            type="email"
            placeholder="email@example.com"
            required
          />

          <h3 className="text-xl font-medium mb-2">Enter Password</h3>
          <div className="relative w-full mb-7">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#f5f5f5] rounded-lg px-4 outline-none py-3 w-full text-lg pr-10 border border-transparent focus:border-black focus:bg-white transition-all"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              required
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <button className="bg-[#111] text-white font-semibold rounded-lg px-4 outline-none py-3 w-full text-lg mb-4 shadow-lg hover:bg-black active:scale-[0.98] transition-all">
            Login
          </button>
        </form>

        <p className="text-center mb-5 text-[17px] text-gray-600">
          New Here?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Create new Account
          </Link>
        </p>
      </div>

      <div>
        <Link to='/captain-login' className="bg-[#10b461] text-white font-semibold flex items-center justify-center rounded-lg px-4 outline-none py-3 w-full text-lg mb-7 shadow-lg hover:bg-[#0da057] active:scale-[0.98] transition-all">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
