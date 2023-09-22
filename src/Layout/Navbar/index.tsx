import React from 'react';
import { Link } from 'react-router-dom';

    const Navbar: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
    };

    return (
        <div className="container-fluid bg-secondary text-white">
        <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
            <h3>PRODUCT</h3>
            <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/" onClick={handleLogout}>
                Logout
            </Link>
            </div>
        </nav>
        </div>
    );
};

export default Navbar;
