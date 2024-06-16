import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import LandingPage from "./screens/landing page/LandingPage";
import Mynotes from "./MyNotes/Mynotes";
import Registerscreen from "./RegisterPage/Registerscreen";
import Loginscreen from "./Login/Loginscreen";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

function App() {
  return (
    <>
    < Header />
      <Routes>
        <Route path="/" element={
          <PublicRoute>

          <LandingPage />
          </PublicRoute>
          } />
        <Route path="/myNotes" element={
          <PrivateRoute>

          <Mynotes/>
          </PrivateRoute>
          
          } />
        <Route path="/register" element={
          <PublicRoute>

          <Registerscreen/>
          </PublicRoute>
          } />
        <Route path="/login" element={
          <PublicRoute>

          <Loginscreen/>
          </PublicRoute>
          } />
     
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
