import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
export const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': 'c54168ad93msh0f6dab9e177ff08p1a16d4jsn47dab7da28be',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const axiosGetReq = async (url) => {
  const res = await axios.get(`${BASE_URL}/${url}`, options);
  return res.data;
};
