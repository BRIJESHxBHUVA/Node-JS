import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Company AdminPanel
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/owner">
                <a href="">
                  ADMIN
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/manager">
                <a href="">
                  MANAGER
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee">
                <a href="">
                  EMPLOYEE
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
