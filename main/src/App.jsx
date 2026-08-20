import { useState, useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";
import Pre from "./component/PreLoader";
import SideNav from "./component/SideNav/SideNav";
import Home from "./component/Home/Home";
import About from "./component/Home/About";
import BlogList from "./component/BlogsList/Blogs";
import BlogPost from "./component/BlogsList/BlogPost";
import Footer from "./component/Footer/Footer";

const Portfolio = () => {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <Pre load={load} />
      <AnimatedCursor />
      <SideNav />
      <Home />
      <About />
      <BlogList />
      <Footer />
    </Fragment>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  );
};

export default App;
