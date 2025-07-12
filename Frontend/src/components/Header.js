import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #008080; /* Teal */
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FFFFFF;
`;

const NavLink = styled(Link)`
  color: #FFFFFF;
  text-decoration: none;
  margin: 0 1rem;
  &:hover { color: #FF6F61; } /* Coral on hover */
`;

const Header = () => (
  <Nav>
    <h1>Skill Swap</h1>
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/search">Search</NavLink>
      <NavLink to="/swaps">Swaps</NavLink>
      <NavLink to="/admin">Admin</NavLink>
    </div>
  </Nav>
);

export default Header;