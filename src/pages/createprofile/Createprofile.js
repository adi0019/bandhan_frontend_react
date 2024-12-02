import React from "react";
import { Link } from "react-router-dom";  // 'Link' is used for navigation in React Router

const creatprofile = () => {
  return (
    <div>
      <h1>Welcome to Profile Page</h1>
      {/* Button to navigate to the Login Page */}
      <Link to="/login">
        <button>Go to Login Page</button>
      </Link>
    </div>
  );
};

export default creatprofile;
