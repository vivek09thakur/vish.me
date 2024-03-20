import React, { useState } from "react";
import SideNav from "./component/SideNav/SideNav";
import Home from "./component/Home/Home";
import About from "./component/Home/About";
import BlogList from "./component/BlogsList/Blogs";
import Footer from "./component/Footer/Footer";
import { Planets } from "react-preloaders";
import { useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";
import "./App.css";

const App = () => {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <React.Fragment>
        <Planets
          background="var(--dark1)"
          animation="slide-down"
          customLoading={load}
          id="planet"
          time={70}
          color="var(--btn_color)"
        />
        <AnimatedCursor />
        <SideNav />
        <Home />
        <About />
        <BlogList />
        <Footer />
      </React.Fragment>
    </>
  );
};

export default App;
