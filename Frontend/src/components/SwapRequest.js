import styled from 'styled-components';

const RequestCard = styled.div`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 16px;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background: ${(props) => (props.accept ? '#4CAF50' : props.reject ? '#FF6F61' : '#008080')};
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin: 0 0.5rem;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`;

const SwapRequest = ({ swap }) => (
  <RequestCard>
    <p>
      <strong>{swap.user}</strong> wants to swap <strong>{swap.skillOffered}</strong> for{' '}
      <strong>{swap.skillWanted}</strong>
    </p>
    <p>Status: {swap.status}</p>
    <Button accept onClick={() => console.log('Accept swap')}>Accept</Button>
    <Button reject onClick={() => console.log('Reject swap')}>Reject</Button>
    <Button onClick={() => console.log('Delete swap')}>Delete</Button>
  </RequestCard>
);

export default SwapRequest;