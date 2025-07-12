import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Admin = () => (
  <Container>
    <h2>Admin Panel</h2>
    <p>Manage skills, users, and swaps here.</p>
    {/* Add AdminDashboard component when ready */}
  </Container>
);

export default Admin;