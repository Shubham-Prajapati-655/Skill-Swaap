import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProfileCard from '../components/ProfileCard';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const Search = () => {
  const [results, setResults] = useState([
    // Mock data
    { name: 'Jane', skillsOffered: ['Photoshop'], skillsWanted: ['Excel'], availability: 'Evenings' },
  ]);

  const handleSearch = (query) => {
    // Replace with API call to backend
    console.log('Searching for:', query);
  };

  return (
    <Container>
      <h2>Search Skills</h2>
      <SearchBar onSearch={handleSearch} />
      <Grid>
        {results.map((user, index) => (
          <ProfileCard key={index} user={user} />
        ))}
      </Grid>
    </Container>
  );
};

export default Search;