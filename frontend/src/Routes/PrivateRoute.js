import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../Store/alertSlice";
import axios from "axios";
import { setUser } from "../Store/authSlice";
import { Navigate } from "react-router-dom";
import { setNote } from "../Store/noteSlice";
import{ useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);  // Add loading state
  const navigate = useNavigate(); 
  const {verify} = useSelector((state)=>state.tfa)
  console.log(verify)

  
    const fetchData = async () => {
      try {
        dispatch(showLoading());
        console.log("Getting notes", localStorage.getItem("token"));

        const { data } = await axios.get(
          "/api/v1/note/getNotes",
          //  { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(data.notes);
        if (data.notes) {
          dispatch(setNote(data.notes));
          dispatch(hideLoading());
          console.log("notes", data.notes);
        }
      } catch (error) {
        console.log("err", error);
        dispatch(hideLoading());
      }
    };

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log("Getting user");
        dispatch(showLoading());
        const { data } = await axios.post(
          "/api/v1/user/getUser",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
      
        dispatch(hideLoading());
        if (data.success) {
          dispatch(setUser(data.data));
        } else {
          localStorage.clear();
        }
      } catch (error) {
        localStorage.clear();
        dispatch(hideLoading());
        console.log(error);
      } finally {
        setLoading(false); // Ensure loading state is set to false once the fetch is done
      }
      fetchData()
    };

    if (!user) {
      console.log("User not found");
      getUser();
    } else {
      setLoading(false); // User is already available
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  } 
  else if(user.is2FAEnabled  && !verify)
    {
      return <Navigate to= "/verifyTfa" />
    }
 
  else if (user) {
  

      return children; // Render children when user is fetched
  } else {
    return <Navigate to="/login" />; // Redirect if no user and not loading
  }
};

export default PrivateRoute;


//   {
//  user ? children : <Navigate to="/login" />;
