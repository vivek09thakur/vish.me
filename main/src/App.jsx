import SideNav from "./component/SideNav/SideNav";
import Home from "./component/Home/Home";
import About from "./component/Home/About";
import BlogList from "./component/BlogsList/Blogs";
import GithubActivity from "./component/Footer/GithubCalender/Calender";
import Footer from "./component/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <SideNav />
      <Home />
      <About />
      <BlogList />
      <GithubActivity />
      <Footer />
    </>
  );
}

export default App;
