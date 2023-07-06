import React from "react";
import forbidden from "../assets/styles/forbidden.module.css";
function Forbidden() {
  return (
    <div className={forbidden["body-forbidden"]}>
      <div className={forbidden.container}>
        <h1>Sorry folks, page is forbidden.</h1>
        <p>The moose out front shoulda told ya.</p>
        <a href="/">Go back to home</a>
      </div>
    </div>
  );
}

export default Forbidden;
