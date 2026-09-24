import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Captainlogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [captainData, setCaptainData] = useState({})


  const sumitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password
    })

    console.log(captainData)

    setEmail("");
    setPassword("");
  };

  
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <div className="-ml-5 mb-8 mt-5">
          <img
            className="w-58"
            src="https://imgs.search.brave.com/9DhoEaTNyXXKPxHI2WbVHOSTWzQg0srycIB2rtan-K4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNC9VYmVy/LUxvZ28tUE5HLUhE/LUltYWdlLnBuZw"
            alt=""
          />
        </div>

        <form onSubmit={(e) => sumitHandler(e)}>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#f5f5f5] rounded-lg px-4 outline-none py-3 mb-3 w-full text-lg pr-10 border border-transparent focus:border-black focus:bg-white transition-all"
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
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600 font-medium hover:underline">
            Register as Captain
          </Link>
        </p>
      </div>

      <div>
        <Link to='/login' className="bg-[#e3885e] text-white font-semibold flex items-center justify-center rounded-lg px-4 outline-none py-3 w-full text-lg mb-7 shadow-lg hover:bg-[#e3885e] active:scale-[0.98] transition-all">
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
