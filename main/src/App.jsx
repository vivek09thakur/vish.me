import { useState, useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
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

  return (
    <Fragment>
      {showPre && <Pre load={load} />}
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
