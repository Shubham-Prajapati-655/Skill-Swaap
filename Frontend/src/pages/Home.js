import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 2rem;
  background: #FFFFFF;
`;

const Button = styled.button`
  background: #FF6F61; /* Coral */
  color: #FFFFFF;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover { background: #E55A50; }
`;

const Home = () => (
  <Container>
    <h1>Welcome to Skill Swap</h1>
    <p>Exchange skills and grow together!</p>
    <Button>Join Now</Button>
  </Container>
);

export default Home;