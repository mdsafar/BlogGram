import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const NotFound = () => {
  return <>
    <Header />
    <section>
      <div className="PageNotFound">
        <div className="ErrorIcon">404</div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Home</Link>
      </div>
    </section>

  </>
};

export default NotFound;