import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

import { categories } from '../functions/categories';

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Stack
      direction='row'
      gap={5}
      sx={{
        overflow: 'auto',
        width: { md: '220px' },
        height: { md: '77vh' },
        borderRight: '1px solid #3d3d3d',
        ml: 4,
        flexDirection: { md: 'column' },
        padding: '30px 16px',
      }}
    >
      {categories.map((category) => (
        <button
          className='category-btn'
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background:
              category.name === selectedCategory ? '#FFF' : 'black',
            color: category.name === selectedCategory ? '#A6A6A6' : 'white',
          }}
          key={category.name}
        >
          <span
            style={{
              color: category.name === selectedCategory ? '#A6A6A6' : 'white',
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? '1' : '0.8',
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Categories;
