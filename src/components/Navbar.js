import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-custom navbar-expand-md fixed-top">
      <a
        className="navbar-brand"
        style={{ fontFamily: '"Poppins", sans-serifs', paddingBottom: 0 }}
        href="."
      >
        Covindia
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
        style={{ color: "white" }}
      >
        <span style={{ paddingTop: 7, paddingLeft: 0 }}>
          <b>Menu</b>
        </span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="nav navbar-nav navbar-item-center">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              style={{ fontWeight: "bold", paddingBottom: 4 }}
              href="analytics"
            >
              Analytics
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              style={{ fontWeight: "bold", paddingBottom: 4 }}
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

export default Navbar;
