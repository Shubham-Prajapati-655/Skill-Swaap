import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import AddSkill from './pages/AddSkill';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SkillProvider } from './context/SkillContext';
import Auth from './pages/Auth';
import './index.css';

// Create a wrapper component to use the auth hook
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="bg-gradient-mesh"></div>
      <Navbar />
      <Routes>
        {/* If user is not logged in, redirect root to /auth, otherwise show Home */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/add" element={user ? <AddSkill /> : <Navigate to="/auth" replace />} />
        <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <SkillProvider>
        <AppRoutes />
      </SkillProvider>
    </AuthProvider>
  );
}

export default App;
