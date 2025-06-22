import request from '../axios';

const baseURL = '/lessons';

export const getLessons = async (courseId, params) => {
  try {
    const response = await request('GET', `/courses/${courseId}${baseURL}`, { params });

    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao obter aulas. Tente novamente.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};