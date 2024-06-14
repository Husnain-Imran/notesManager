import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import LandingPage from "./screens/landing page/LandingPage";
import Mynotes from "./MyNotes/Mynotes";

function App() {
  return (
    <>
    < Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/myNotes" element={<Mynotes/>} />
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
