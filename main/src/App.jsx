import { useState, useEffect, Fragment, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Pre from "./component/PreLoader";
import SideNav from "./component/SideNav/SideNav";
import Home from "./component/Home/Home";
import About from "./component/Home/About";
import BlogList from "./component/BlogsList/Blogs";
import Footer from "./component/Footer/Footer";

const BlogPost = lazy(() => import("./component/BlogsList/BlogPost"));

const PRELOADER_DONE_MS = 1200;
const PRELOADER_UNMOUNT_MS = 2400;

const Portfolio = () => {
  const [load, updateLoad] = useState(true);
  const [showPre, setShowPre] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => updateLoad(false), PRELOADER_DONE_MS);
    const unmount = setTimeout(() => setShowPre(false), PRELOADER_UNMOUNT_MS);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmount);
    };
  }, []);

  return (
    <Fragment>
      {showPre && <Pre load={load} />}
      <SideNav ready={!load} />
      <Home ready={!load} />
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
      <Route
        path="/blog/:id"
        element={
          <Suspense fallback={<div className="max-w-3xl mx-auto px-5 py-24 text-center opacity-70">Loading article…</div>}>
            <BlogPost />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
