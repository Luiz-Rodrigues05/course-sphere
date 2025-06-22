import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

const request = async (method, url, data = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error;
    } 
    else if (error.request) {
      throw new Error('Erro de rede. Verifique sua conexão.');
    } 
    else {
      throw new Error('Erro desconhecido.');
    }
  }
};

export default request;
