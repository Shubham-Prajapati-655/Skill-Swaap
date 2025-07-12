import { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #008080; /* Teal */
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
`;

const Button = styled.button`
  background: #008080;
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: #006666; }
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search skills (e.g., Photoshop, Excel)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchContainer>
  );
};

export default SearchBar;