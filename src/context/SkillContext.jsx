import { createContext, useState, useEffect, useContext } from 'react';

const SkillContext = createContext();

export const useSkills = () => useContext(SkillContext);

const INITIAL_SKILLS = [
  { id: '1', title: 'Advanced React patterns', category: 'Development', user: 'Alex D.', userId: 'system', type: 'offering', color: 'var(--accent-color)', glow: 'var(--accent-glow)' },
  { id: '2', title: 'UX Research Methods', category: 'Design', user: 'Sarah W.', userId: 'system', type: 'looking', color: 'var(--secondary-color)', glow: 'var(--secondary-glow)' },
  { id: '3', title: 'Technical Writing', category: 'Content', user: 'Mike R.', userId: 'system', type: 'offering', color: 'var(--primary-color)', glow: 'var(--primary-glow)' },
];

const API_BASE = import.meta.env.DEV
  ? `http://${window.location.hostname}:5000/api`
  : '/api';

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_BASE}/skills`);
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    };
    fetchSkills();
  }, []);

  const addSkill = async (skillData) => {
    try {
      const response = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData)
      });
      const newSkill = await response.json();
      setSkills(prev => [newSkill, ...prev]);
      return newSkill;
    } catch (error) {
      console.error('Failed to add skill:', error);
      throw error;
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      const response = await fetch(`${API_BASE}/skills/${skillId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setSkills(prev => prev.filter(skill => skill.id !== skillId));
      }
    } catch (error) {
      console.error('Failed to delete skill:', error);
      throw error;
    }
  };

  return (
    <SkillContext.Provider value={{ skills, addSkill, deleteSkill }}>
      {children}
    </SkillContext.Provider>
  );
};
