import styled from 'styled-components';

const Card = styled.div`
  background: #F5F5F5; /* Light gray */
  border-radius: 8px;
  padding: 16px;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover { transform: scale(1.02); }
  max-width: 300px;
`;

const Button = styled.button`
  background: #008080; /* Teal */
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: #006666; }
`;

const ProfileCard = ({ user }) => (
  <Card>
    <h3>{user.name}</h3>
    <p>Location: {user.location || 'Not specified'}</p>
    <p>Skills Offered: {user.skillsOffered?.join(', ') || 'None'}</p>
    <p>Skills Wanted: {user.skillsWanted?.join(', ') || 'None'}</p>
    <p>Availability: {user.availability || 'Not set'}</p>
    <Button>Request Swap</Button>
  </Card>
);

export default ProfileCard;