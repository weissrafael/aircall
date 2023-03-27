import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    'https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export { axiosInstance as axiosRequest };
