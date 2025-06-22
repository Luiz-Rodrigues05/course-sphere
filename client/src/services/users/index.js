import request from '../../services/axios';

export const login = async (email, password) => {
  try {
    const response = await request('POST', '/login', {
      email,
      password
    });

    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao tentar fazer login. Tente novamente.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};
