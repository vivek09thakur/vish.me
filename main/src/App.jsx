import SideNav from "./component/SideNav/SideNav";
import Home from "./component/Home/Home";
import About from "./component/Home/About";
import Footer from "./component/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
        <SideNav />
        <Home />
        <About/>
        <Footer />
    </>
  );
}

export default App;
