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
server.post('/user/:userID/courses', (req, res) => {
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
