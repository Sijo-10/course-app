import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/utils";
const SignupPage = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errormessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BACKEND_URL}/user/signup`, {
                firstName,
                lastName,
                email,
                password
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                },
            })
            console.log("Signup successfull", response.data);
            toast.success(response.data.message)
            navigate("/login")
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.errors || "signup failed");
            }
        }
    }

    return (
        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center text-white">
            {/* Header */}
            <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5">
                <div className="flex items-center space-x-2">
                    <img
                        src="https://images-platform.99static.com//KlBLMX8dQrcq6hZGnxf5HSnG29I=/8x543:525x1060/fit-in/500x500/99designs-contests-attachments/123/123360/attachment_123360235"
                        alt="Logo"
                        className="w-10 h-10 rounded-full"
                    />
                    <Link to="/" className="text-xl font-bold text-orange-500">
                    Skilltide
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link
                        to="/login"
                        className="border border-gray-500 p-2 text-sm md:text-md md:px-4 rounded-md hover:bg-white hover:text-black transition text-red-500"
                    >
                        Login
                    </Link>
                    <Link
                        to="/courses"
                        className="bg-orange-500 p-2 text-sm md:text-md md:px-4 rounded-md hover:bg-orange-600 transition"
                    >
                        Join now
                    </Link>
                </div>
            </header>

            {/* Signup Form */}
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[400px] mx-4">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Welcome to <span className="text-orange-500">Skilltide</span>
                </h2>
                <p className="text-center text-gray-400 mb-6">Just Signup To Join Us!</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstname" className="text-gray-400 mb-2 block">
                            Firstname
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your firstname"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastname" className="text-gray-400 mb-2 block">
                            Lastname
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your lastname"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="text-gray-400 mb-2 block">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="name@email.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="text-gray-400 mb-2 block">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="********"
                            required
                        />
                    </div>

                    {errormessage && (
                        <div className="mb-4 text-red-600 text-center">{errormessage}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
                    >
                        Signup
                    </button>
                </form>            </div>
        </div>

    );
};

export default SignupPage;
