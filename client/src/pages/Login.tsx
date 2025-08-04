import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { IoIosArrowRoundForward } from "react-icons/io";


const Login = () => {
    const {login,setLogin,showPassword,setShowPassword} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
        setLogin(false);
        console.log(login)
      const res:any = await axios.post(`${backend_url}/login`, {
        email,
        password,
      });
      console.log(res)

      if (
        res.data.message == "User Not Exist!" ||
        res.data.message == "Incorrect Password!"
      ) {
        toast.error(res.data.message);
        return
      } else {
        setLogin(true);
        console.log(login);
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("userId", res.data.user.userId);
        
        toast.success("Login successfully!")
        navigate("/")
      }
      
    } catch (error: any) {
      const msg =
        error.res?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-1">Login</h2>
        <p className="text-sm text-gray-600 mb-5">
          Stay updated on your professional world
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="sagar@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] text-sm text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full mt-2"
          >
            Login
          </button>
          <div
                    onClick={() => navigate("/signup")}
                    className="flex items-center justify-center mt-2 text-md cursor-pointer mr-6"
                  >
                    <IoIosArrowRoundForward className="text-2xl " />
                    <span>Signup</span>
                  </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
