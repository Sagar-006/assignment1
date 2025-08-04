import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IoIosArrowRoundForward } from "react-icons/io";


const Signup = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl:
      "https://i.pinimg.com/1200x/31/48/3a/31483ae532b39d1dfd135a9bcce45616.jpg", // default avatar
  });

 
  const {setLogin,setShowPassword,showPassword} = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.bio ==="" || formData.email === ""||formData.username === "" ||formData.password === "") return ;
    try {
    
      const res:any = await axios.post(
        `${backend_url}/signup`,
        formData
      );
      console.log(res.data);
        localStorage.setItem("token", res.data.token);
      if (res.data.message == "you are signed in") {
        // localStorage.setItem("user",res.data.user);
        setLogin(true);
        toast.success(res.data.message);
        navigate("/profile")
      } else {
        toast.error(res.data.message)
        navigate("/signup")
      }
    
    } catch (err: any) {
      console.error("Signup error:", err.response?.data || err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-1">Sign up</h2>
        <p className="text-sm text-gray-600 mb-5">
          Make the most of your professional life
        </p>

        <div className="mb-4">
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="abcd@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[35px] text-sm text-blue-500"
          >
            {showPassword ? "hide" : "show"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Bio</label>
          <input
            type="text"
            name="bio"
            placeholder="bio for user profile"
            value={formData.bio}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full"
        >
          Signup
        </button>
        <div
          onClick={() => navigate("/login")}
          className="flex items-center justify-center mt-2 text-md cursor-pointer mr-6"
        >
          <IoIosArrowRoundForward className="text-2xl " />
          <span>Login</span>
        </div>
      </form>
      <div className="items-"></div>
    </div>
  );
};

export default Signup;
