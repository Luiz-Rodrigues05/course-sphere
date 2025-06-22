import request from '../../services/axios';

const baseURL = '/courses';

export const getCourses = async (userID) => {
  try {
    const response = await request('GET', `/user/${userID}${baseURL}`, {
      userID
    });

    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao obter cursos. Tente novamente.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};
