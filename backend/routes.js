const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Ticket, Comment } = require('./models');
const router = express.Router();

const SECRET = 'SECRET_KEY'; // Use variável de ambiente em produção

// Middleware de autenticação
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Cadastro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hash });
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ error: 'Senha inválida' });
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET);
  res.json({ token });
});

// Criar chamado
router.post('/tickets', auth, async (req, res) => {
  const { title, description } = req.body;
  const ticket = await Ticket.create({ title, description, userId: req.user.id });
  res.json(ticket);
});

// Listar chamados
router.get('/tickets', auth, async (req, res) => {
  const tickets = await Ticket.findAll({
    include: [{ model: Comment, as: 'comments', include: [{ model: User, as: 'user', attributes: ['name'] }] }]
  });
  res.json(tickets);
});

// Atualizar status do chamado
router.patch('/tickets/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Chamado não encontrado' });
  ticket.status = status;
  await ticket.save();
  res.json(ticket);
});

// Comentar chamado
router.post('/tickets/:id/comments', auth, async (req, res) => {
  const { message } = req.body;
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Chamado não encontrado' });
  const comment = await Comment.create({ message, ticketId: ticket.id, userId: req.user.id });
  res.json(comment);
});

module.exports = router;