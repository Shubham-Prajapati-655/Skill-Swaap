import SwapRequest from '../components/SwapRequest';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Swaps = () => {
  const swaps = [
    // Mock data
    { user: 'Jane', skillOffered: 'Photoshop', skillWanted: 'Excel', status: 'Pending' },
  ];

  return (
    <Container>
      <h2>Your Swaps</h2>
      {swaps.map((swap, index) => (
        <SwapRequest key={index} swap={swap} />
      ))}
    </Container>
  );
};

export default Swaps;