const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Endpoint de login
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get('users').find({ email }).value();

  if (!user) {
    // Caso o email não seja encontrado
    return res.status(400).json({ message: 'Email não encontrado' });
  }

  if (user.password !== password) {
    // Caso a senha esteja errada
    return res.status(400).json({ message: 'Senha incorreta' });
  }

  // [REFACTOR]
  // Idealmente, aqui deveria gerar um token JWT ou algo similar para autenticação
  // Mas para este exemplo, vou apenas retornar os dados do usuário para get fácil
  const session = { id: user.id, name: user.name, email: user.email };
  router.db.get('sessions').push(session).write();
  res.status(200).json(session);
});
  
// Endpoint para buscar os cursos de um usuário
server.get('/user/:userID/courses', (req, res) => {
  const { userID } = req.params;

  // Converte o userID para número, pois no db.json o id é um número
  const id = parseInt(userID, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'O ID do usuário deve ser um número.' });
  }

  const user = router.db.get('users').find({ id }).value();

  // Verifica se o usuário existe
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Filtra os cursos onde o usuário é o criador
  // [REFACTOR] falta caso de indicador
  const courses = router.db.get('courses').filter({ creator_id: id }).value();

  res.status(200).json(courses);
});

// Usar o roteador do json-server
server.use(router)

server.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000')
})

// Endpoint para buscar um curso
server.get('/course/:courseID', (req, res) => {
  const { courseID } = req.params;

  //Converte o ID para um número, pois no db.json ele é um número
  const id = parseInt(courseID, 10);

  // Validação: Se o ID não for um número válido, retorna um erro
  if (isNaN(id)) {
    return res.status(400).json({ message: 'O ID do curso deve ser um número.' });
  }

  // Procura pelo curso na tabela 'courses' do db.json
  const course = router.db.get('courses').find({ id: id }).value();

  // Se o curso não for encontrado, retorna um erro 404 (Not Found)
  if (!course) {
    return res.status(404).json({ message: 'Curso não encontrado.' });
  }

  // Se o curso for encontrado, retorna os dados com status 200 (OK)
  res.status(200).json(course);
});

server.get('/courses/:courseID/lessons', (req, res) => {
  const { courseID } = req.params;
  const courseId = parseInt(courseID, 10);

  // 1. Validar se o curso existe no banco de dados
  const course = db.courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({ message: 'Curso não encontrado.' });
  }

  // 2. Capturar parâmetros da query para busca, filtro e paginação
  //    - 'q' para busca textual no título (search Query)
  //    - 'status' para filtrar por status ('published' ou 'draft')
  //    - '_page' e '_limit' para paginação (com valores padrão)
  const { q, status, _page = 1, _limit = 10 } = req.query;
  const page = parseInt(_page, 10);
  const limit = parseInt(_limit, 10);

  // 3. Iniciar com todas as aulas que pertencem ao curso
  let lessons = db.lessons.filter(lesson => lesson.courseId === courseId);

  // 4. Aplicar o filtro de busca textual (parâmetro 'q')
  if (q) {
    const searchTerm = q.toLowerCase();
    lessons = lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(searchTerm)
    );
  }

  // 5. Aplicar o filtro por status (parâmetro 'status')
  if (status) {
    lessons = lessons.filter(lesson => lesson.status === status);
  }

  // 6. Aplicar a paginação
  const totalCount = lessons.length; // Total de itens *após* os filtros
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedLessons = lessons.slice(startIndex, endIndex);

  // 7. Enviar o 'X-Total-Count' no cabeçalho da resposta.
  //    Isso é crucial para o frontend saber o total de páginas.
  res.setHeader('X-Total-Count', totalCount);
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count'); // Permite que o navegador acesse o header

  // 8. Retornar as aulas paginadas e filtradas
  res.status(200).json(paginatedLessons);
});