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
  const [showPre, setShowPre] = useState(true);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);
    // unmount the preloader after its slide-out so its orbit animations stop running
    const unmount = setTimeout(() => setShowPre(false), 2400);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmount);
    };
  }, []);

  // touch devices have no hover cursor, so skip the custom one there
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasPointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Fragment>
      {showPre && <Pre load={load} />}
      {hasPointer && <AnimatedCursor />}
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
