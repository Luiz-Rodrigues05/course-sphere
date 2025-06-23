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

server.post('/courses', (req, res) => {
  const courseData = req.body;
  // Simples validação para garantir que os dados essenciais foram enviados
  if (!courseData.name || !courseData.creator_id) {
    return res.status(400).json({ message: 'Dados insuficientes para criar o curso.' });
  }

  const courses = router.db.get('courses');
  // Gera um novo ID para o curso
  const newId = courses.value().length > 0 ? Math.max(...courses.map(c => c.id).value()) + 1 : 1;
  
  const newCourse = {
    id: newId,
    ...courseData
  };
  
  courses.push(newCourse).write();
  
  res.status(201).json(newCourse);
});

// PUT /courses/:id - Atualizar um curso existente
server.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    const updatedData = req.body;

    if (isNaN(courseId)) {
        return res.status(400).json({ message: 'O ID do curso deve ser um número.' });
    }

    const course = router.db.get('courses').find({ id: courseId });

    if (!course.value()) {
        return res.status(404).json({ message: 'Curso não encontrado.' });
    }

    // Atualiza o curso, garantindo que o creator_id não seja alterado
    const result = course.assign({
        name: updatedData.name,
        description: updatedData.description,
        start_date: updatedData.start_date,
        end_date: updatedData.end_date,
        // Garante que outros campos como instructors e creator_id não sejam sobrescritos se não vierem na request
    }).write();

    res.status(200).json(result);
});


// DELETE /courses/:id - Deletar um curso e suas aulas
server.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id, 10);

    if (isNaN(courseId)) {
        return res.status(400).json({ message: 'O ID do curso deve ser um número.' });
    }

    const course = router.db.get('courses').find({ id: courseId }).value();

    if (!course) {
        return res.status(404).json({ message: 'Curso não encontrado.' });
    }
    
    // Deletar aulas associadas ao curso
    router.db.get('lessons').remove({ course_id: courseId }).write();
    
    // Deletar o curso
    router.db.get('courses').remove({ id: courseId }).write();

    res.status(200).json({ message: 'Curso e aulas associadas deletados com sucesso.' });
});

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

  // 1. Validar se o curso existe
  const course = router.db.get('courses').find({ id: courseId }).value();
  if (!course) {
    return res.status(404).json({ message: 'Curso não encontrado.' });
  }

  // 2. Capturar parâmetros da query
  const { q, status, _page = 1, _limit = 10 } = req.query;
  const page = parseInt(_page, 10);
  const limit = parseInt(_limit, 10);

  // 3. Iniciar com todas as aulas que pertencem ao curso
  // CORREÇÃO: Usando a propriedade correta 'course_id' do db.json
  let lessons = router.db.get('lessons').filter({ course_id: courseId }).value();

  // 4. Aplicar o filtro de busca textual
  if (q) {
    const searchTerm = q.toLowerCase();
    lessons = lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(searchTerm)
    );
  }

  // 5. Aplicar o filtro por status
  if (status) {
    lessons = lessons.filter(lesson => lesson.status === status);
  }

  // 6. Aplicar a paginação
  const totalCount = lessons.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedLessons = lessons.slice(startIndex, endIndex);

  // 7. Enviar o cabeçalho 'X-Total-Count'
  res.setHeader('X-Total-Count', totalCount);
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

  // 8. Retornar as aulas paginadas
  res.status(200).json(paginatedLessons);
});

server.get('/courses/:courseID/instructors', (req, res) => {
  const { courseID } = req.params;
  const courseId = parseInt(courseID, 10);

  // 1. Validar se o curso existe
  const course = router.db.get('courses').find({ id: courseId }).value();
  if (!course) {
    return res.status(404).json({ message: 'Curso não encontrado.' });
  }

  // 2. Obter os IDs dos instrutores
  // CORREÇÃO: Acessando a propriedade correta 'instructors' do db.json
  const instructorIds = course.instructors || [];

  // 3. Buscar os objetos de usuário completos
  const instructors = router.db.get('users').filter(user => instructorIds.includes(user.id)).value();

  // 4. Capturar parâmetros de paginação
  const { _page = 1, _limit = 5 } = req.query;
  const page = parseInt(_page, 10);
  const limit = parseInt(_limit, 10);

  // 5. Aplicar a paginação
  const totalCount = instructors.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedInstructors = instructors.slice(startIndex, endIndex);

  // 6. Mapear para retornar apenas os campos necessários (id e name)
  const result = paginatedInstructors.map(instructor => ({
    id: instructor.id,
    name: instructor.name,
  }));

  // 7. Enviar o cabeçalho 'X-Total-Count'
  res.setHeader('X-Total-Count', totalCount);
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

  // 8. Retornar os instrutores paginados
  res.status(200).json(result);
});

// Usar o roteador do json-server
server.use(router)

server.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000')
})