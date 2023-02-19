import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Videos from './Videos'
import Categories from './Categories'
import {axiosGetReq} from '../functions/index';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);
    const fetchVideos = async () => {
      const data = await axiosGetReq(
        `search?part=snippet&q=${selectedCategory}`
      );
      setVideos(data.items);
    };

    fetchVideos();
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      

      <Box
        sx={{
          overflow: 'auto',
          height: '90vh',
          flex: 2,
        }}
      >
        <Typography
          fontSize={25}
          fontWeight={900}
          textAlign='center'
          pt={1}
          pb={2}
          sx={{ textTransform: 'capitalize', color: 'white' }}
        >
          {selectedCategory || 'Recommended'} Videos
        </Typography>
        <Videos videos={videos} />
      </Box>
      <Box sx={{ position: 'relative' }}>
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
    </Stack>
  );
};

export default Feed;
