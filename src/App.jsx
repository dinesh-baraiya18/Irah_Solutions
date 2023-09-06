import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import Blogs from "./pages/blogs/Blogs";
import DigitalSolution from "./pages/digital-solution/DigitalSolution";
import BlogDetails from "./pages/blogs/BlogDetails";
import LifeCoaches from "./pages/life-coaches/LifeCoaches";
import UserDetails from "./UserDetails";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/blog_details/:id" element={<BlogDetails />} />
        <Route path="/digital_solution" element={<DigitalSolution />} />
        <Route path="/life_coaches" element={<LifeCoaches />} />
        <Route path="/user_details" element={<UserDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
