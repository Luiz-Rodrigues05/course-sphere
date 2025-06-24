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

export const getLesson = async (lessonID, params) => {
  try {
    const response = await request('GET', `${baseURL}/${lessonID}`, { params });
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao obter aulas. Tente novamente.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const createLesson = async (lessonData) => {
  try {
    const response = await request('POST', baseURL, { data: lessonData });
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao criar a aula.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const updateLesson = async (lessonId, lessonData) => {
  try {
    const response = await request('PATCH', `${baseURL}/${lessonId}`, { data: lessonData });
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao atualizar a aula.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const deleteLesson = async (lessonId) => {
  try {
    const response = await request('DELETE', `${baseURL}/${lessonId}`);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao excluir a aula.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};