import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../utils/utils';



function Home() {

    const [courses, setCourses] = useState([])

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("user")
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])
    const handleLogout = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/logout`, {
                withCredentials: true,
            });

            if (!response || !response.data) {
                throw new Error("No response from server");
            }

            toast.success(response.data.message || "Logged out successfully");
            localStorage.removeItem("user");
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Error in logging out:", error);
            toast.error(error.response?.data?.errors || "Error in logging out");
        }
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/course/courses`,
                    {
                        withCredentials: true
                    }
                )
                console.log(response.data.courses);
                setCourses(response.data.courses)

            } catch (error) {
                console.log("error in fetchcourse ", error);

            }
        };
        fetchCourse();

    }, [])

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        initialSlide: 0,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
                <div className="h-screen text-red container mx-auto">
                    {/* header */}

                    <header className='flex items-center justify-between p-6'>
                        <div className='flex items-center space-x-2'>
                            <img src="https://images-platform.99static.com//KlBLMX8dQrcq6hZGnxf5HSnG29I=/8x543:525x1060/fit-in/500x500/99designs-contests-attachments/123/123360/attachment_123360235" alt="logo" className='w-10 h-10 rounded-full' />
                            <h1 className='text-2xl text-orange-700 font-bold'>Skilltide</h1>
                        </div>
                        <div className='space-x-4'>
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className='bg-transparent text-red py-2 px-4 border border-pink-500 rounded hover:bg-red-400' >Logout</button>

                            ) : (<>
                                <Link to={"/login"} className='bg-transparent text-red py-2 px-4 border border-pink-500 rounded hover:bg-red-400' >Login</Link>
                                <Link to={"/signup"} className='bg-transparent text-red py-2 px-4 border border-pink-500 rounded hover:bg-green-500' >Signup</Link>

                            </>)
                            }
                        </div>
                    </header>

                    {/* main section */}

                    <section className="flex flex-col md:flex-row items-center justify-between py-20 px-6 md:px-20">
                        {/* Left Content */}
                        <div className="md:w-1/2 text-center md:text-left">
                            <h1 className="text-4xl font-semibold text-orange-600">Skilltide</h1>
                            <br />
                            <p className="text-gray-600">
                                Unlock Your Potential. Learn Anytime, Anywhere.
                                <br />
                                Join thousands of learners building their future with expert-led online courses.
                            </p>
                            <div className="space-x-4 mt-8">
                                <Link
                                    to={"/courses"}
                                    className="bg-green-500 text-white px-6 py-3 rounded font-semibold hover:bg-red-300 duration-300 hover:text-black mt-4 inline-block"
                                >
                                    Explore courses
                                </Link>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                            <img
                                src="https://t3.ftcdn.net/jpg/03/39/60/22/360_F_339602256_dBq6bYfHWzlnRQkXgAMFXZfx2r1DPQns.jpg"
                                alt="Learning illustration"
                                className="w-full max-w-md rounded-lg shadow-lg"
                            />
                        </div>
                    </section>
                    <section className='bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100'>
                        <Slider {...settings}>
                            {
                                courses.map((course) => (
                                    <div key={course} className='p-4'>
                                        <div className='relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105'>
                                            <div className='bg-gray-900 rounded-lg overflow-hidden'>
                                                <img className='h-32 w-full object-contain' src={course.image.url} alt="" />
                                                <div className='p-6 text-center'>
                                                    <h2 className='text-xl font-bold text-white'>{course.title}</h2>
                                                    <button className='mt-8 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300'>Enroll Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                    </section>
                    <hr />
                    {/* footer */}
                    {/* Footer */}
                    <footer className="bg-gray-900 text-white py-10 mt-12">
                        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Logo & Socials */}
                            <div className="flex flex-col items-center md:items-start">
                                <div className="flex items-center space-x-2 mb-4">
                                    <img
                                        src="https://images-platform.99static.com//KlBLMX8dQrcq6hZGnxf5HSnG29I=/8x543:525x1060/fit-in/500x500/99designs-contests-attachments/123/123360/attachment_123360235"
                                        alt="Logo"
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <h1 className="text-2xl font-bold text-orange-500">Skilltide</h1>
                                </div>
                                <p className="mb-2 text-gray-400">Follow us</p>
                                <div className="flex space-x-4">
                                    <a href="#" className="hover:text-blue-400 transition-all text-2xl">
                                        <FaFacebook />
                                    </a>
                                    <a href="#" className="hover:text-pink-500 transition-all text-2xl">
                                        <FaInstagram />
                                    </a>
                                    <a href="#" className="hover:text-sky-400 transition-all text-2xl">
                                        <FaTwitter />
                                    </a>
                                </div>
                            </div>

                            {/* Connects */}
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg font-semibold mb-4">Connects</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="hover:text-white transition cursor-pointer">YouTube - xyz course</li>
                                    <li className="hover:text-white transition cursor-pointer">Telegram - xyz group</li>
                                    <li className="hover:text-white transition cursor-pointer">GitHub - xyz.com</li>
                                </ul>
                            </div>

                            {/* Legal */}
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg font-semibold mb-4">© 2025 Skilltide</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="hover:text-white transition cursor-pointer">Terms & Conditions</li>
                                    <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
                                    <li className="hover:text-white transition cursor-pointer">Refund & Cancellation</li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>

            </div>
        </>
    )
}

export default Home
