import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex-column justify-content-center w-100 text-center shadow ">
      <div>
        <h1 className="fw-bold fs-1 py-4">The Rick And Morty </h1>
      </div>
      <div className="mt-1 w-100 h-100 bg-dark py-2 ">
        <div className="nav-link d-flex align-items-center gap-4 justify-content-center max-w-4 m-auto px-2 fw-bold fs-4 ">
          <Link to="/" className="link text-light">
            Character List
          </Link>
          <Link to="/locations" className="link text-light">
            Character Location
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
