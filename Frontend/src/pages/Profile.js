import ProfileCard from '../components/ProfileCard';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  display: grid;
  place-items: center;
`;

const Profile = () => {
  const user = {
    name: 'John Doe',
    location: 'New York',
    skillsOffered: ['Photoshop', 'Graphic Design'],
    skillsWanted: ['Excel', 'Data Analysis'],
    availability: 'Weekends',
  };

  return (
    <Container>
      <h2>Your Profile</h2>
      <ProfileCard user={user} />
    </Container>
  );
};

export default Profile;