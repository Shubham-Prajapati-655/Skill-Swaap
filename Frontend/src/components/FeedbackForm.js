import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 16px;
  margin: 1rem;
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

const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Leave Feedback</h3>
      <label>
        Rating (1-5):
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <Button type="submit">Submit Feedback</Button>
    </Form>
  );
};

export default FeedbackForm;