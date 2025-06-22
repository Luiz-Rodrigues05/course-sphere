import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

const request = async (method, url, config = {}) => {
  const headers = { ...config.headers };

  try {
    const response = await api({
      method,
      url,
      ...config,
      headers,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default request;