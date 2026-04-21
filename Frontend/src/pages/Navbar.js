import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/auth.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        <div className="navbar-brand-icon">🏥</div>
        <span className="navbar-brand-name">MediClear</span>
      </Link>

      <div className="navbar-links">
        <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>Dashboard</Link>
        <Link to="/submit" className={isActive("/submit") ? "active" : ""}>Submit</Link>
        <Link to="/status" className={isActive("/status") ? "active" : ""}>Track</Link>
        <Link to="/admin" className={isActive("/admin") ? "active" : ""}>Admin</Link>
      </div>

      <div className="navbar-actions">
        <button className="btn-logout" onClick={handleLogout}>Sign out</button>
      </div>
    </nav>
  );
}

export default Navbar;