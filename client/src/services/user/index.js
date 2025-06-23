import request from '../../services/axios';
import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await request('POST', '/login', {
      data: { email, password },
    });

    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao tentar fazer login. Tente novamente.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await request('POST', '/users', { data: userData });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao criar usuário.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const getRandomUser = async () => {
  try {
    const response = await axios.get('https://api.randomuser.me/?nat=br');
    return response.data.results[0];
  } catch (error) {
    throw new Error('Não foi possível buscar um novo usuário. Tente novamente.');
  }
};
