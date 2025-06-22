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
  
    // Se email e senha estiverem corretos
    const session = { user_id: user.id, token: 'dummy-token' };
    router.db.get('sessions').push(session).write();
    res.status(200).json({ message: 'Login bem-sucedido', token: session.token });
  });
  

// Usar o roteador do json-server
server.use(router)

server.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000')
})
