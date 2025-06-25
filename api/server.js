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

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Email ou senha incorretos.' });
  }
  
  const session = { id: user.id, name: user.name, email: user.email };
  router.db.get('sessions').push(session).write();
  res.status(200).json(session);
});

server.post('/users', (req, res) => {
  const userData = req.body;

  if (!userData.email || !userData.name || !userData.password) {
    return res.status(400).json({ message: 'Dados insuficientes para criar o usuário.' });
  }

  const existingUser = router.db.get('users').find({ email: userData.email }).value();
  if (existingUser) {
    return res.status(409).json({ message: 'Email já cadastrado.' });
  }

  const users = router.db.get('users');
  const newId = users.value().length > 0 ? Math.max(...users.map(u => u.id).value()) + 1 : 1;
  
  const newUser = {
    id: newId,
    ...userData
  };
  
  users.push(newUser).write();
  
  res.status(201).json(newUser);
});
  
// Endpoint para buscar os cursos de um usuário
server.get('/users/:userID/courses', (req, res) => {
  const { userID } = req.params;
  const id = parseInt(userID, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'O ID do usuário deve ser um número.' });
  }

  const user = router.db.get('users').find({ id }).value();

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Pega todos os cursos para filtrar na aplicação
  const allCourses = router.db.get('courses').value();

  // Filtra os cursos com a nova lógica
  const userCourses = allCourses.filter(course => {
    // Condição 1: O usuário é o criador do curso
    const isCreator = course.creator_id === id;

    // Condição 2: O usuário está incluído no array de instrutores
    // (inclui uma verificação para garantir que o array 'instructors' exista)
    const isInstructor = course.instructors && course.instructors.includes(id);

    // Retorna true se qualquer uma das condições for atendida
    return isCreator || isInstructor;
  });

  res.status(200).json(userCourses);
});

server.post('/courses', (req, res) => {
  const courseData = req.body;
  if (!courseData.name || !courseData.creator_id) {
    return res.status(400).json({ message: 'Dados insuficientes para criar o curso.' });
  }

  const courses = router.db.get('courses');
  const newId = courses.value().length > 0 ? Math.max(...courses.map(c => c.id).value()) + 1 : 1;
  
  const newCourse = {
    id: newId,
    ...courseData
  };
  
  courses.push(newCourse).write();
  
  res.status(201).json(newCourse);
});

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

    const result = course.assign({
        name: updatedData.name,
        description: updatedData.description,
        start_date: updatedData.start_date,
        end_date: updatedData.end_date,
    }).write();

    res.status(200).json(result);
});

server.patch('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    const updatedData = req.body;

    if (isNaN(courseId)) {
        return res.status(400).json({ message: 'O ID do curso deve ser um número.' });
    }

    const course = router.db.get('courses').find({ id: courseId });

    if (!course.value()) {
        return res.status(404).json({ message: 'Curso não encontrado.' });
    }

    const result = course.assign(updatedData).write();

    res.status(200).json(result);
});

server.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id, 10);

    if (isNaN(courseId)) {
        return res.status(400).json({ message: 'O ID do curso deve ser um número.' });
    }

    const course = router.db.get('courses').find({ id: courseId }).value();

    if (!course) {
        return res.status(404).json({ message: 'Curso não encontrado.' });
    }
    
    router.db.get('lessons').remove({ course_id: courseId }).write();
    router.db.get('courses').remove({ id: courseId }).write();

    res.status(200).json({ message: 'Curso e aulas associadas deletados com sucesso.' });
});

server.get('/courses/:courseID', (req, res) => {
  const { courseID } = req.params;
  const userID = parseInt(req.headers.authorization, 10);
  const id = parseInt(courseID, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'O ID do curso deve ser um número.' });
  }

  const course = router.db.get('courses').find({ id: id }).cloneDeep().value();

  if (!course) {
    return res.status(404).json({ message: 'Curso não encontrado.' });
  }

  if (!userID || isNaN(userID)) {
    return res.status(401).json({ message: 'ID do usuário inválido ou não fornecido.' });
  }

  // --- LÓGICA DE PERMISSÃO DE ACESSO ---
  const isCreator = userID === course.creator_id;
  // Garante que course.instructors existe antes de chamar .includes()
  const isInstructor = course.instructors && course.instructors.includes(userID);

  // Se o usuário não é nem criador nem instrutor, nega o acesso.
  if (!isCreator && !isInstructor) {
    return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para ver este curso.' });
  }
  // --- FIM DA LÓGICA DE PERMISSÃO ---

  // Se o usuário tem acesso, determina a permissão de edição.
  // Apenas o criador pode editar os detalhes do curso.
  course.can_edit = isCreator;

  // Retorna o objeto do curso já com o campo 'can_edit' embutido
  res.status(200).json(course);
});

server.get('/courses/:courseID/lessons', (req, res) => {
  const { courseID } = req.params;
  const courseId = parseInt(courseID, 10);
  const userID = parseInt(req.headers.authorization, 10);

  // 1. Validações iniciais
  if (isNaN(courseId)) {
    return res.status(400).json({ message: 'O ID do curso deve ser um número.' });
  }

  const course = router.db.get('courses').find({ id: courseId }).value();
  if (!course) {
    return res.status(404).json({ message: 'Curso não encontrado.' });
  }

  if (!userID || isNaN(userID)) {
    return res.status(401).json({ message: 'ID do usuário inválido ou não fornecido.' });
  }

  // 2. Lógica de Acesso (Forbidden)
  const isCourseCreator = userID === course.creator_id;
  const isCourseInstructor = course.instructors && course.instructors.includes(userID);

  if (!isCourseCreator && !isCourseInstructor) {
    return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para ver as aulas deste curso.' });
  }

  // 3. Busca e filtragem das aulas (lógica existente)
  const { q, status, _page = 1, _limit = 10 } = req.query;
  const page = parseInt(_page, 10);
  const limit = parseInt(_limit, 10);

  let lessons = router.db.get('lessons').filter({ course_id: courseId }).cloneDeep().value();

  if (q) {
    const searchTerm = q.toLowerCase();
    lessons = lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(searchTerm)
    );
  }

  if (status) {
    lessons = lessons.filter(lesson => lesson.status === status);
  }

  // 5. Paginação da lista enriquecida
  const totalCount = lessons.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedLessons = lessons.slice(startIndex, endIndex);

  const enrichedPaginatedLessons = paginatedLessons.map(lesson => {
    const isCourseCreator = userID === course.creator_id;
    const isCourseInstructor = course.instructors && course.instructors.includes(userID);
    const isLessonCreator = userID == lesson.creator_id;

    const hasPermission = isCourseCreator || (isCourseInstructor && isLessonCreator);

    lesson.can_edit = hasPermission;
    return lesson;
  });

  res.setHeader('X-Total-Count', totalCount);
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

  res.status(200).json(enrichedPaginatedLessons);
});

// ### INÍCIO DAS NOVAS ROTAS DE AULAS ###

// POST /lessons - Criar uma nova aula
server.post('/lessons', (req, res) => {
  const lessonData = req.body;
  // Renomeando 'courseId' para 'course_id' para consistência com o db.json
  const { title, courseId, creatorId, video_url } = lessonData;
  const course_id = courseId;
  const creator_id = creatorId;

  if (!title || !course_id || !creator_id || !video_url) {
    return res.status(400).json({ message: 'Dados insuficientes para criar a aula.' });
  }

  // Verificar se o curso existe
  const course = router.db.get('courses').find({ id: parseInt(course_id, 10) }).value();
  if (!course) {
    return res.status(404).json({ message: 'Curso associado não encontrado.' });
  }

  const lessons = router.db.get('lessons');
  const newId = lessons.value().length > 0 ? Math.max(...lessons.map(l => l.id).value()) + 1 : 1;
  
  const newLesson = {
    id: newId,
    ...lessonData,
    course_id: parseInt(course_id, 10),
    creator_id: parseInt(creator_id, 10)
  };
  delete newLesson.courseId; // Remove a chave antiga se existir
  
  lessons.push(newLesson).write();
  
  res.status(201).json(newLesson);
});

// GET /lessons/:id - Buscar uma aula específica
server.get('/lessons/:id', (req, res) => {
  const lessonId = parseInt(req.params.id, 10);
  const userID = parseInt(req.headers.authorization, 10);

  // 1. Validações iniciais
  if (isNaN(lessonId)) {
    return res.status(400).json({ message: 'O ID da aula deve ser um número.' });
  }

  if (!userID || isNaN(userID)) {
    return res.status(401).json({ message: 'ID do usuário inválido ou não fornecido.' });
  }

  const lesson = router.db.get('lessons').find({ id: lessonId }).value();
  if (!lesson) {
    return res.status(404).json({ message: 'Aula não encontrada.' });
  }

  // 2. Busca o curso para verificar as permissões
  const course = router.db.get('courses').find({ id: lesson.course_id }).value();
  if (!course) {
    return res.status(404).json({ message: 'Curso associado à aula não foi encontrado.' });
  }

  // 3. Verifica se o usuário tem pelo menos UMA das permissões necessárias
  const isCourseCreator = userID === course.creator_id;
  const isCourseInstructor = course.instructors && course.instructors.includes(userID);
  const isLessonCreator = userID === lesson.creator_id;

  const hasPermission = isCourseCreator || (isCourseInstructor && isLessonCreator);

  console.log(isCourseCreator, isCourseInstructor, isLessonCreator, hasPermission);

  // Se não tiver nenhuma permissão, retorna 403 Forbidden
  if (!hasPermission) {
    return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para ver esta aula.' });
  }
  
  // Se passou na verificação, retorna a aula sem modificações.
  res.status(200).json(lesson);
});

// PATCH /lessons/:id - Atualizar uma aula existente
server.patch('/lessons/:id', (req, res) => {
  const lessonId = parseInt(req.params.id, 10);
  const updatedData = req.body;

  if (isNaN(lessonId)) {
    return res.status(400).json({ message: 'O ID da aula deve ser um número.' });
  }

  const lesson = router.db.get('lessons').find({ id: lessonId });
  if (!lesson.value()) {
    return res.status(404).json({ message: 'Aula não encontrada.' });
  }

  // Atualiza a aula. O 'creatorId' e 'course_id' não devem ser alterados aqui.
  const result = lesson.assign(updatedData).write();

  res.status(200).json(result);
});

// DELETE /lessons/:id - Deletar uma aula
server.delete('/lessons/:id', (req, res) => {
  const lessonId = parseInt(req.params.id, 10);
  if (isNaN(lessonId)) {
    return res.status(400).json({ message: 'O ID da aula deve ser um número.' });
  }

  const lesson = router.db.get('lessons').find({ id: lessonId }).value();
  if (!lesson) {
    return res.status(404).json({ message: 'Aula não encontrada.' });
  }

  router.db.get('lessons').remove({ id: lessonId }).write();

  res.status(200).json({ message: 'Aula deletada com sucesso.' });
});


server.get('/courses/:courseID/instructors', (req, res) => {
  const { courseID } = req.params;
  const courseId = parseInt(courseID, 10);

  const course = router.db.get('courses').find({ id: courseId }).value();
  if (!course) {
    return res.status(404).json({ message: 'Curso não encontrado.' });
  }

  const instructorIds = course.instructors || [];
  const instructors = router.db.get('users').filter(user => instructorIds.includes(user.id)).value();

  const { _page = 1, _limit = 5 } = req.query;
  const page = parseInt(_page, 10);
  const limit = parseInt(_limit, 10);

  const totalCount = instructors.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedInstructors = instructors.slice(startIndex, endIndex);

  const result = paginatedInstructors.map(instructor => ({
    id: instructor.id,
    name: instructor.name,
  }));

  res.setHeader('X-Total-Count', totalCount);
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

  res.status(200).json(result);
});

// Usar o roteador do json-server
server.use((req, res, next) => {
  // Permite que o navegador envie o cabeçalho 'Authorization'
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

server.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000')
})