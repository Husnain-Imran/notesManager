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
import CreateNotes from "./createNotes/CreateNotes";
import SingleNote from "./createNotes/SingleNote";
import { useEffect, useState } from "react";
import Qrcode from "./Qrcode/Qrcode";
import Verifytfa from "./2faVerify/Verifytfa";
import { useSelector ,useDispatch } from "react-redux"
import { Navigate } from "react-router-dom";
import { verify } from "./Store/tfaSlice";
function App() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(search);
  useEffect(()=>
  {
    dispatch(verify());
    

  },[dispatch])
  return (
    <>
      <Header setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verifyTfa"
          element={
            user ? (
              user.is2FAEnabled ? (
                <Verifytfa />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/myNotes"
          element={
            <PrivateRoute>
              <Mynotes search={search} />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Registerscreen />
            </PublicRoute>
          }
        />
        {}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Loginscreen />
            </PublicRoute>
          }
        />

        <Route
          path="createNote"
          element={
            <PrivateRoute>
              <CreateNotes />
            </PrivateRoute>
          }
        />
        <Route path="note/:id" element={<SingleNote />} />
        <Route
          path="register2fa"
          element={
            <PrivateRoute>
              <Qrcode />
            </PrivateRoute>
          }
        />
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
