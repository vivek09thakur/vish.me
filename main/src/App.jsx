import { useState, useEffect, Fragment } from "react";
import AnimatedCursor from "react-animated-cursor";
import Pre from "./component/PreLoader";
import SideNav from "./component/SideNav/SideNav";
import Home from "./component/Home/Home";
import About from "./component/Home/About";
import BlogList from "./component/BlogsList/Blogs";
import Footer from "./component/Footer/Footer";
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
      <Fragment>
        <Pre load={load} />
        <AnimatedCursor />
        <SideNav />
        <Home />
        <About />
        <BlogList />
        <Footer />
      </Fragment>
    </>
  );
};

export default App;
