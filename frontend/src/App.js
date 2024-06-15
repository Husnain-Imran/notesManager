import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import LandingPage from "./screens/landing page/LandingPage";
import Mynotes from "./MyNotes/Mynotes";
import Registerscreen from "./RegisterPage/Registerscreen";
import Loginscreen from "./Login/Loginscreen";

function App() {
  return (
    <>
    < Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/myNotes" element={<Mynotes/>} />
        <Route path="/register" element={<Registerscreen/>} />
        <Route path="/login" element={<Loginscreen/>} />
     
      </Routes>
      <Footer />
    </>
    // <div className="App">
    //  <Header />
    //  <main>
    //   <LandingPage />
    //  </main>
    //  <Footer  />
    // </div>
  );
}

export default App;
