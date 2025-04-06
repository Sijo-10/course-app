import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// User Components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Courses from "./components/Courses";
import Buy from "./components/Buy";
import Purchase from "./components/Purchase"; // Keeping "Purchase" as per second code

// Admin Components
import AdminSignup from "./Admin/AdminSignup";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import Coursecreate from "./Admin/Coursecreate";
import Updatecourse from "./Admin/Updatecourse";
import Ourcourses from "./Admin/Ourcourses";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Other Routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy />} />
        <Route path="/purchases" element={<Purchase />} />

        {/* Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={admin ? <Dashboard /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/create-course"
          element={admin ? <Coursecreate /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/updatecourse/:id"
          element={admin ? <Updatecourse /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/ourcourses"
          element={admin ? <Ourcourses /> : <Navigate to="/admin/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
