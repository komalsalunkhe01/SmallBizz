import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';

// Styled Card component with hover effect
const StyledCard = styled(Card)(
  ({ theme }) => ({
    margin: '10px',
    width: '200px',
    cursor: 'pointer',
    transition: 'transform 0.3s', // Smooth transition for transform property
    '&:hover': {
      transform: 'scale(1.05)', // Scale up by 5% on hover
    },
  })
);

const Cards = ({ products, handleCardClick }) => {
  const handleClick = (category) => {
    if (handleCardClick) {
      handleCardClick(category);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {products.map((product) => (
        <StyledCard key={product.id} onClick={() => handleClick(product.name)}>
          <CardContent>
            <Typography variant="h6" component="div">
              {product.name}
            </Typography>
            <img src={product.image} alt={product.name} style={{ width: '100%', marginTop: '10px' }} />
          </CardContent>
        </StyledCard>
      ))}
    </div>
  );
};

export default Cards;
