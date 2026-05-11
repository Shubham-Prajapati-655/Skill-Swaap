import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="badge glass"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <FiZap className="badge-icon" />
            <span>The Future of Skill Exchange</span>
          </motion.div>

          <h1 className="hero-title">
            Swap Skills, <br />
            <span className="text-gradient">Empower Growth.</span>
          </h1>
          
          <p className="hero-subtitle">
            Join the premium community where professionals trade knowledge. 
            Offer what you know, learn what you need, entirely for free.
          </p>

          <div className="hero-actions">
            <Link to="/explore">
              <button className="btn btn-primary btn-large">
                Start Exploring <FiArrowRight />
              </button>
            </Link>
            <Link to="/add">
              <button className="btn btn-outline btn-large">
                Offer a Skill
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Floating elements for aesthetic */}
        <div className="hero-visuals">
          <motion.div 
            className="glass-card float-1"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="card-icon ui-design">🎨</div>
            <h3>UI/UX Design</h3>
            <p>Offering 2 hrs/week</p>
          </motion.div>

          <motion.div 
            className="glass-card float-2"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <div className="card-icon react">⚛️</div>
            <h3>React Development</h3>
            <p>Looking for mentor</p>
          </motion.div>

          <motion.div 
            className="glass-card float-3"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="card-icon marketing">📈</div>
            <h3>Growth Marketing</h3>
            <p>Offering 1 hr/week</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
