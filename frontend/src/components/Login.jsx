import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/utils";

const login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errormessage,setErrorMessage]=useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/user/login`, {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      })
      console.log("login successfull", response.data);
      toast.success(response.data.message);
      localStorage.setItem("user",JSON.stringify(response.data));
      navigate("/")
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "login failed");
      }
    }
  }

  return (
<div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center relative overflow-hidden">
  {/* Header */}
  <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5 z-10">
    <div className="flex items-center space-x-2">
      <img
        src="https://images-platform.99static.com//KlBLMX8dQrcq6hZGnxf5HSnG29I=/8x543:525x1060/fit-in/500x500/99designs-contests-attachments/123/123360/attachment_123360235"
        alt="Logo"
        className="w-10 h-10 rounded-full"
      />
      <Link to="/" className="text-xl font-bold text-orange-500">Skilltide</Link>
    </div>
    <div className="flex items-center space-x-4">
      <Link to="/signup" className="border border-orange-400 text-orange-600 hover:bg-orange-100 px-4 py-2 rounded-md transition">Sign Up</Link>
      <Link to="/courses" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition">Join Now</Link>
    </div>
  </header>

  {/* Login Card */}
  <div className="bg-white/80 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl px-10 py-12 w-full max-w-md mx-4 mt-10">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to <span className="text-orange-500">Skilltide</span></h2>
    <p className="text-center text-gray-600 mb-6">Log in to access premium courses</p>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="••••••••"
          required
        />
      </div>

      {errormessage && (
        <div className="text-red-600 text-sm text-center">{errormessage}</div>
      )}

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
      >
        Login
      </button>
    </form>
  </div>
</div>
  );
};

export default login;
