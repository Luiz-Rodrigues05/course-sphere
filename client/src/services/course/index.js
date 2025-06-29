import request from '../../services/axios';

const baseURL = '/courses';

export const getCourses = async (userID) => {
  try {
    const response = await request('GET', `/users/${userID}${baseURL}`, {
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

export const getCourse = async (courseID) => {
  try {
    const response = await request('GET', `${baseURL}/${courseID}`);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao obter os detalhes do curso.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const getCourseInstructors = async (courseID, params) => {
  try {
    const response = await request('GET', `${baseURL}/${courseID}/instructors`, { params });
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao obter os instrutores do curso.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await request('POST', baseURL, {data: courseData});
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao criar o curso.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const updateCourse = async (courseID, courseData) => {
  try {
    const response = await request('PUT', `${baseURL}/${courseID}`, {data: courseData});
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao atualizar o curso.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const updateInstructors = async (courseID, courseData) => {
  try {
    const response = await request('PATCH', `${baseURL}/${courseID}`, {data: courseData});
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao atualizar o curso.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};

export const deleteCourse = async (courseID) => {
  try {
    const response = await request('DELETE', `${baseURL}/${courseID}`);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao deletar o curso.');
    }
    throw new Error(error.message || 'Erro desconhecido.');
  }
};