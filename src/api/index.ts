import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.disneyapi.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
