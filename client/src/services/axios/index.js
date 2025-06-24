import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
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
  // Começamos com uma cópia dos cabeçalhos existentes
  const headers = { ...config.headers };
  const user = getUserFromStorage();

  // Verifica se o usuário está logado
  if (user && user.id) {
    // Define a condição para excluir: a requisição de login
    const isLoginRequest = method.toLowerCase() === 'post' && url === '/login';

    // Se NÃO for a requisição de login, adiciona o ID ao cabeçalho Authorization
    if (!isLoginRequest) {
      // Adicionamos o ID do usuário ao cabeçalho de autorização.
      // O backend precisará ser ajustado para ler este cabeçalho.
      headers['Authorization'] = `${user.id}`;
    }
  }

  try {
    const response = await api({
      method,
      url, // A URL não é mais modificada
      ...config,
      headers, // Passamos o objeto de cabeçalhos atualizado
    });

    return response;
  } catch (error) {
    // Verificamos se o erro tem um objeto de resposta da API
    if (error.response) {
      const { status } = error.response;

      // Status 403: Forbidden (Acesso Negado)
      if (status === 403) {
        window.location.href = '/forbidden';
      }

      // Status 404: Not Found (Não Encontrado)
      if (status === 404) {
        window.location.href = '/not-found';
      }

      // Status 401: Unauthorized (Não Autenticado)
      if (status === 401) {
        window.location.href = '/unauthorized';
      }
    }

    // É importante relançar o erro para que qualquer lógica .catch()
    // no local da chamada (ex: para parar um loader) ainda funcione.
    throw error;
  }
};

export default request;
