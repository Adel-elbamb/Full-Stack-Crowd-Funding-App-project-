import React from "react";
import styles from './Navbar.module.css'; // Import the CSS module
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.jpeg";


const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}>
      <div className="container">
        {/* Left: Logo */}
        <Link to="/" className={`${styles.navbarBrand} navbar-brand d-flex align-items-center`}>
          <img src={logo} alt="Logo" height="40" className="me-2" />
          <strong>Chuffed</strong>
        </Link>

        {/* Center: Navigation Links */}
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`${styles.navLinks} nav-link`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLinks} nav-link`} to="/project">Donations</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLinks} nav-link`} to="/create">Create Project</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLinks} nav-link`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLinks} nav-link`} to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Right: Profile Options */}
        <div className="d-flex align-items-center">
          {isAuthenticated ? (
            <>
              <Link className="nav-link me-3" to="/profile">Profile</Link>
              <button className={`${styles.btnLink} btn btn-link nav-link`} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="nav-link me-3" to="/login">Login</Link>
          )}
          <div className="user-icon ms-3">
            <i className="fas fa-user-circle fa-2x text-muted"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
