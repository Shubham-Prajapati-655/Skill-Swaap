import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSkills } from '../context/SkillContext';
import { useAuth } from '../context/AuthContext';
import './AddSkill.css';

const AddSkill = () => {
  const { addSkill } = useSkills();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Development',
    description: ''
  });
  const [type, setType] = useState('offering');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCategoryColors = (category) => {
    switch(category) {
      case 'Development': return { color: 'var(--accent-color)', glow: 'var(--accent-glow)' };
      case 'Design': return { color: 'var(--secondary-color)', glow: 'var(--secondary-glow)' };
      case 'Marketing': return { color: '#ffb703', glow: 'rgba(255, 183, 3, 0.5)' };
      default: return { color: 'var(--primary-color)', glow: 'var(--primary-glow)' };
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    setIsSubmitting(true);
    
    const categoryColors = getCategoryColors(formData.category);
    
    try {
      await addSkill({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        type,
        user: user.name,
        userId: user.id,
        ...categoryColors
      });

      setIsSubmitting(false);
      navigate('/explore');
    } catch (error) {
      console.error(error);
      alert("Failed to publish skill. Please make sure the server is running!");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-container container">
      <motion.div 
        className="add-card glass"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="add-header">
          <div className="icon-wrapper">
            <FiUploadCloud />
          </div>
          <h2>Post a Skill</h2>
          <p>Share your expertise or request help from the community.</p>
        </div>

        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Skill Type</label>
            <div className="type-toggle">
              <button 
                type="button" 
                className={`btn ${type === 'offering' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setType('offering')}
              >
                Offering
              </button>
              <button 
                type="button" 
                className={`btn ${type === 'looking' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setType('looking')}
              >
                Looking For
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Advanced React Architecture" 
              className="glass-input" 
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="glass-input"
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Content">Content Creation</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you're offering or looking for..." 
              rows="4" 
              className="glass-input"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : <><FiPlus /> Publish Skill</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddSkill;
