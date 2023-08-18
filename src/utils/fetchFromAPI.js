import axios from 'axios';

const BASE_URl = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: '50',
  },
  headers: {
    'X-RapidAPI-Key': 'ff4a3fe9f4mshc7743e07bf52c5ap14511djsn641ca3bc740d',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URl}/${url}`, options);
  return data;
};
