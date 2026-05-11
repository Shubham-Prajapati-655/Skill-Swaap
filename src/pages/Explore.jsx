import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiMessageSquare } from 'react-icons/fi';
import { useSkills } from '../context/SkillContext';
import './Explore.css';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { skills } = useSkills();

  const categories = ['All', 'Development', 'Design', 'Marketing', 'Content'];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          skill.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="explore-container container">
      <motion.div 
        className="explore-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Explore <span className="text-gradient">Skills</span></h1>
        <p>Find what you need, offer what you know.</p>

        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by skill, category, or user..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="skills-grid"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {filteredSkills.map(skill => (
          <motion.div 
            key={skill.id}
            className="skill-card glass"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{ 
              y: -8, 
              boxShadow: `0 15px 30px ${skill.glow}`,
              borderColor: skill.color
            }}
          >
            <div className="skill-card-header">
              <span 
                className={`skill-badge ${skill.type === 'offering' ? 'badge-offer' : 'badge-look'}`}
              >
                {skill.type === 'offering' ? 'Offering' : 'Looking For'}
              </span>
              <span className="skill-category" style={{ color: skill.color }}>
                {skill.category}
              </span>
            </div>
            
            <h3 className="skill-title">{skill.title}</h3>
            
            <div className="skill-card-footer">
              <div className="skill-user">
                <div className="user-avatar" style={{ border: `2px solid ${skill.color}` }}>
                  {skill.user.charAt(0)}
                </div>
                <span>{skill.user}</span>
              </div>
              <button 
                className="icon-btn" 
                style={{ color: skill.color, background: `${skill.glow.replace('0.5', '0.1')}` }}
                onClick={() => alert(`Messaging feature coming soon!\nSimulated sending a message to ${skill.user} about '${skill.title}'...`)}
                title={`Message ${skill.user}`}
              >
                <FiMessageSquare />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Explore;
