import SideNav from "./component/SideNav/SideNav";
import Home from "./component/Home/Home";
import About from "./component/Home/About";
import Footer from "./component/Footer/Footer";
// import BlogList from "./component/BlogsList/Blogs";
import "./App.css";

function App() {
  return (
    <>
        <SideNav />
        <Home />
        <About/>
        {/* <BlogList/> */}
        <Footer />
    </>
  );
}

export default App;
