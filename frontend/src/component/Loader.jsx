import React from "react";
import { Spinner } from "react-bootstrap";  

const Loader = ({size=100}) => {
  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
        
    }}>

    <Spinner animation="border" role="status">
      <span className="visually-hidden"></span>
    </Spinner>
    </div>
  );
};

export default Loader;
