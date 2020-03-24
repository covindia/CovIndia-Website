import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-custom navbar-expand-md fixed-top">
      <a
        className="navbar-brand"
        style={{ fontFamily: '"Poppins", sans-serifs', paddingBottom: 0 }}
        href="/"
      >
        <span style={{ color: "#CC99CC", fontSize: "1em" }}>Cov</span>India
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
        style={{ color: "white" }}
      >
        <span style={{ paddingTop: "7px", paddingLeft: 0 }}>
          <b>Menu</b>
        </span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="nav navbar-nav navbar-item-center">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              style={{ fontWeight: "bold", paddingBottom: "4px" }}
              href="analytics"
            >
              Analytics
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              style={{ fontWeight: "bold", paddingBottom: "4px" }}
              href="about"
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
