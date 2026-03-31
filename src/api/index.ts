import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.disneyapi.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});
