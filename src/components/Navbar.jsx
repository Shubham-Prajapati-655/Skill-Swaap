import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHexagon, FiUser, FiSearch, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Explore', path: '/explore', icon: <FiSearch /> },
    { name: 'Add Skill', path: '/add', icon: <FiPlusCircle /> },
    { name: 'Profile', path: '/profile', icon: <FiUser /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header 
      className="navbar glass"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FiHexagon className="logo-icon" />
          <span className="logo-text">Skill<span className="text-gradient">Swaap</span></span>
        </Link>

        <nav className="navbar-links">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.name} to={link.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                {link.icon}
                <span>{link.name}</span>
                {isActive && (
                  <motion.div 
                    className="nav-indicator"
                    layoutId="navIndicator"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <>
              <div className="user-avatar" style={{ border: '2px solid var(--accent-color)', width: '40px', height: '40px' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
                <FiLogOut />
              </button>
            </>
          ) : (
            <Link to="/auth">
              <button className="btn btn-primary">Login / Register</button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
