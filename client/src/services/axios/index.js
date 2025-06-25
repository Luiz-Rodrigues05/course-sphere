import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Falha ao parsear usuário do localStorage", error);
    return null;
  }
};

const request = async (method, url, config = {}) => {
  const headers = { ...config.headers };
  const user = getUserFromStorage();

  // Verifica se o usuário está logado
  if (user && user.id) {
    const isLoginRequest = method.toLowerCase() === 'post' && url === '/login';
    if (!isLoginRequest) {
      headers['Authorization'] = `${user.id}`;
    }
  }

  try {
    const response = await api({
      method,
      url,
      ...config,
      headers,
    });

    return response;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      if (status === 403) {
        window.location.href = '/forbidden';
      }
      if (status === 404) {
        window.location.href = '/not-found';
      }
      if (status === 401) {
        window.location.href = '/unauthorized';
      }
    }
    throw error;
  }
};

export default request;
