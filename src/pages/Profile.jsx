import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiUser, FiMail, FiStar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../context/SkillContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const { skills, deleteSkill } = useSkills();

  // Filter skills to only show the ones belonging to the currently logged in user
  const userSkills = skills.filter(skill => skill.userId === user?.id);

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this skill post?')) {
      await deleteSkill(id);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container container">
      <motion.div 
        className="profile-header glass"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-avatar-large">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="profile-email"><FiMail /> {user.email}</p>
          <div className="profile-stats">
            <span className="stat-badge"><FiStar /> Premium Member</span>
            <span className="stat-badge">{userSkills.length} Skills Posted</span>
          </div>
        </div>
      </motion.div>

      <div className="profile-content">
        <div className="content-header">
          <h2>My Active Posts</h2>
        </div>

        {userSkills.length === 0 ? (
          <motion.div 
            className="empty-state glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>You haven't posted any skills yet.</p>
          </motion.div>
        ) : (
          <motion.div 
            className="user-skills-grid"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            <AnimatePresence>
              {userSkills.map(skill => (
                <motion.div 
                  key={skill.id}
                  className="skill-card glass"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1 }
                  }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  layout
                >
                  <div className="skill-card-header">
                    <span className={`skill-badge ${skill.type === 'offering' ? 'badge-offer' : 'badge-look'}`}>
                      {skill.type === 'offering' ? 'Offering' : 'Looking For'}
                    </span>
                    <span className="skill-category" style={{ color: skill.color }}>
                      {skill.category}
                    </span>
                  </div>
                  
                  <h3 className="skill-title">{skill.title}</h3>
                  <p className="skill-desc">{skill.description}</p>
                  
                  <div className="skill-card-footer">
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(skill.id)}
                      title="Delete Post"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;
